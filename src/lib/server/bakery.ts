import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import type { MenuItem, OrderSummary, PaymentMethod, PaymentStatus, Rating } from "@/lib/bakery";
import { chargeCard } from "@/lib/payment";

type ItemRow = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  price_cents: number;
  image_path: string;
  featured: boolean;
  serves: string | null;
  allergens: string | null;
  sort_order: number;
  avg_stars: number | string | null;
  rating_count: number | string;
};

function mapItem(row: ItemRow): MenuItem {
  const avg =
    row.avg_stars === null || row.avg_stars === undefined
      ? null
      : Number(row.avg_stars);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    priceCents: Number(row.price_cents),
    imagePath: row.image_path,
    featured: Boolean(row.featured),
    serves: row.serves,
    allergens: row.allergens,
    sortOrder: Number(row.sort_order),
    avgStars: avg !== null && Number.isFinite(avg) ? avg : null,
    ratingCount: Number(row.rating_count) || 0,
  };
}

const ITEM_SELECT = `
  select
    m.id, m.slug, m.name, m.description, m.category, m.price_cents,
    m.image_path, m.featured, m.serves, m.allergens, m.sort_order,
    avg(r.stars) as avg_stars,
    count(r.id) as rating_count
  from menu_items m
  left join ratings r on r.item_id = m.id
`;

export const listMenuItems = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    const rows = await sql.query<ItemRow>(
      `${ITEM_SELECT} group by m.id order by m.sort_order asc`,
    );
    return rows.map(mapItem);
  },
);

export const getMenuItem = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const rows = await sql.query<ItemRow>(
      `${ITEM_SELECT} where m.slug = $1 group by m.id`,
      [slug],
    );
    return rows[0] ? mapItem(rows[0]) : null;
  });

type RatingRow = {
  id: number;
  stars: number;
  comment: string | null;
  created_at: string;
  user_id: string;
};

export const listRatings = createServerFn({ method: "GET" })
  .validator((itemId: number) => itemId)
  .handler(async ({ data: itemId }) => {
    const sql = await getSql();
    const rows = await sql.query<RatingRow>(
      `select id, stars, comment, created_at, user_id
       from ratings
       where item_id = $1
       order by created_at desc
       limit 24`,
      [itemId],
    );
    return rows.map(
      (row): Rating => ({
        id: row.id,
        stars: Number(row.stars),
        comment: row.comment,
        createdAt: String(row.created_at),
      }),
    );
  });

export const getMyRating = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((itemId: number) => itemId)
  .handler(async ({ context, data: itemId }) => {
    const sql = await getSql();
    const rows = await sql.query<RatingRow>(
      `select id, stars, comment, created_at, user_id
       from ratings where item_id = $1 and user_id = $2`,
      [itemId, context.userId],
    );
    const row = rows[0];
    if (!row) return null;
    return {
      id: row.id,
      stars: Number(row.stars),
      comment: row.comment,
      createdAt: String(row.created_at),
      isMine: true,
    } satisfies Rating;
  });

const ratingSchema = z.object({
  itemId: z.number().int().positive(),
  stars: z.number().int().min(1).max(5),
  comment: z.string().max(400).optional(),
});

export const upsertRating = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => ratingSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const comment = data.comment?.trim() || null;
    await sql.query(
      `insert into ratings (user_id, item_id, stars, comment)
       values ($1, $2, $3, $4)
       on conflict (user_id, item_id)
       do update set stars = excluded.stars, comment = excluded.comment, created_at = now()`,
      [context.userId, data.itemId, data.stars, comment],
    );
    return { ok: true as const };
  });

const orderLineSchema = z.object({
  itemId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(200),
});

const cardSchema = z.object({
  name: z.string(),
  number: z.string(),
  expiry: z.string(),
  cvc: z.string(),
});

const orderSchema = z.object({
  kind: z.enum(["pickup", "bulk", "catering"]),
  eventDate: z.string().min(1),
  eventTime: z.string().min(1),
  guestCount: z.number().int().min(1).max(500).optional(),
  contactName: z.string().trim().min(1).max(80),
  contactPhone: z.string().trim().min(7).max(40),
  notes: z.string().max(800).optional(),
  lines: z.array(orderLineSchema).min(1),
  paymentMethod: z.enum(["online", "pickup"]),
  card: cardSchema.optional(),
});

export const createOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const ids = data.lines.map((line) => line.itemId);
    const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
    const items = await sql.query<{ id: number; price_cents: number }>(
      `select id, price_cents from menu_items where id in (${placeholders})`,
      ids,
    );
    if (items.length !== ids.length) {
      throw new Error("One or more menu items are no longer available.");
    }
    const priceById = new Map(items.map((item) => [Number(item.id), Number(item.price_cents)]));
    const amountCents = data.lines.reduce((sum, line) => {
      const unit = priceById.get(line.itemId) ?? 0;
      return sum + unit * line.quantity;
    }, 0);

    let paymentStatus: PaymentStatus = "pay_at_pickup";
    let cardLast4: string | null = null;
    let cardBrand: string | null = null;
    let paidCents: number | null = null;
    let paidAt: string | null = null;

    if (data.paymentMethod === "online") {
      if (!data.card) throw new Error("Enter your card details to pay now.");
      const charge = chargeCard(data.card);
      if (!charge.ok) throw new Error(charge.error);
      paymentStatus = "paid";
      cardLast4 = charge.last4;
      cardBrand = charge.brand;
      paidCents = amountCents;
      paidAt = new Date().toISOString();
    }

    const inserted = await sql.query<{ id: number }>(
      `insert into orders (
         user_id, kind, status, event_date, event_time, guest_count,
         contact_name, contact_phone, notes,
         payment_method, payment_status, paid_cents, card_last4, card_brand, paid_at
       ) values ($1, $2, 'requested', $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       returning id`,
      [
        context.userId,
        data.kind,
        data.eventDate,
        data.eventTime,
        data.guestCount ?? null,
        data.contactName,
        data.contactPhone,
        data.notes?.trim() || null,
        data.paymentMethod,
        paymentStatus,
        paidCents,
        cardLast4,
        cardBrand,
        paidAt,
      ],
    );
    const orderId = inserted[0]?.id;
    if (!orderId) throw new Error("Could not create the order.");

    for (const line of data.lines) {
      const unit = priceById.get(line.itemId);
      if (unit === undefined) continue;
      await sql.query(
        `insert into order_items (order_id, item_id, quantity, unit_price_cents)
         values ($1, $2, $3, $4)`,
        [orderId, line.itemId, line.quantity, unit],
      );
    }

    if (paymentStatus === "paid") {
      await sql.query(
        `insert into payments (order_id, user_id, amount_cents, status, card_last4, card_brand)
         values ($1, $2, $3, 'succeeded', $4, $5)`,
        [orderId, context.userId, amountCents, cardLast4, cardBrand],
      );
    }

    return {
      id: orderId,
      paymentStatus,
      cardLast4,
      paidCents,
    };
  });

const paySchema = z.object({
  orderId: z.number().int().positive(),
  card: cardSchema,
});

export const payOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => paySchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const orders = await sql.query<{
      id: number;
      payment_status: string;
    }>(
      `select id, payment_status from orders where id = $1 and user_id = $2`,
      [data.orderId, context.userId],
    );
    const order = orders[0];
    if (!order) throw new Error("Order not found.");
    if (order.payment_status === "paid") {
      throw new Error("This order is already paid.");
    }

    const lines = await sql.query<{ quantity: number; unit_price_cents: number }>(
      `select quantity, unit_price_cents from order_items where order_id = $1`,
      [data.orderId],
    );
    const amountCents = lines.reduce(
      (sum, line) => sum + Number(line.quantity) * Number(line.unit_price_cents),
      0,
    );
    if (amountCents <= 0) throw new Error("Nothing to charge on this order.");

    const charge = chargeCard(data.card);
    if (!charge.ok) throw new Error(charge.error);

    await sql.query(
      `update orders
       set payment_method = 'online',
           payment_status = 'paid',
           paid_cents = $1,
           card_last4 = $2,
           card_brand = $3,
           paid_at = now()
       where id = $4 and user_id = $5`,
      [amountCents, charge.last4, charge.brand, data.orderId, context.userId],
    );
    await sql.query(
      `insert into payments (order_id, user_id, amount_cents, status, card_last4, card_brand)
       values ($1, $2, $3, 'succeeded', $4, $5)`,
      [data.orderId, context.userId, amountCents, charge.last4, charge.brand],
    );

    return {
      id: data.orderId,
      paymentStatus: "paid" as const,
      cardLast4: charge.last4,
      cardBrand: charge.brand,
      paidCents: amountCents,
    };
  });

type OrderRow = {
  id: number;
  kind: OrderSummary["kind"];
  status: string;
  event_date: string | null;
  event_time: string | null;
  guest_count: number | null;
  notes: string | null;
  created_at: string;
  payment_method: PaymentMethod | null;
  payment_status: PaymentStatus | null;
  paid_cents: number | null;
  card_last4: string | null;
  card_brand: string | null;
};

type OrderItemRow = {
  order_id: number;
  name: string;
  quantity: number;
  unit_price_cents: number;
};

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const orders = await sql.query<OrderRow>(
      `select id, kind, status, event_date, event_time, guest_count, notes, created_at,
              payment_method, payment_status, paid_cents, card_last4, card_brand
       from orders where user_id = $1 order by created_at desc`,
      [context.userId],
    );
    if (orders.length === 0) return [] as OrderSummary[];

    const orderIds = orders.map((order) => order.id);
    const placeholders = orderIds.map((_, i) => `$${i + 1}`).join(", ");
    const lines = await sql.query<OrderItemRow>(
      `select oi.order_id, m.name, oi.quantity, oi.unit_price_cents
       from order_items oi
       join menu_items m on m.id = oi.item_id
       where oi.order_id in (${placeholders})`,
      orderIds,
    );
    const byOrder = new Map<number, OrderSummary["items"]>();
    for (const line of lines) {
      const list = byOrder.get(line.order_id) ?? [];
      list.push({
        name: line.name,
        quantity: Number(line.quantity),
        unitPriceCents: Number(line.unit_price_cents),
      });
      byOrder.set(line.order_id, list);
    }

    return orders.map(
      (order): OrderSummary => ({
        id: order.id,
        kind: order.kind,
        status: order.status,
        eventDate: order.event_date,
        eventTime: order.event_time,
        guestCount: order.guest_count === null ? null : Number(order.guest_count),
        notes: order.notes,
        createdAt: String(order.created_at),
        paymentMethod: order.payment_method ?? "pickup",
        paymentStatus: order.payment_status ?? "pay_at_pickup",
        paidCents: order.paid_cents === null ? null : Number(order.paid_cents),
        cardLast4: order.card_last4,
        cardBrand: order.card_brand,
        items: byOrder.get(order.id) ?? [],
      }),
    );
  });

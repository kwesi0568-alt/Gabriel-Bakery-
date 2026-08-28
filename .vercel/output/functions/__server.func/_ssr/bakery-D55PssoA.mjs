import { i as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-CnaLodOW.mjs";
import { t as authMiddleware } from "./middleware-CW6-8zqs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bakery-D55PssoA.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function mapItem(row) {
	const avg = row.avg_stars === null || row.avg_stars === void 0 ? null : Number(row.avg_stars);
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
		ratingCount: Number(row.rating_count) || 0
	};
}
var ITEM_SELECT = `
  select
    m.id, m.slug, m.name, m.description, m.category, m.price_cents,
    m.image_path, m.featured, m.serves, m.allergens, m.sort_order,
    avg(r.stars) as avg_stars,
    count(r.id) as rating_count
  from menu_items m
  left join ratings r on r.item_id = m.id
`;
var listMenuItems_createServerFn_handler = createServerRpc({
	id: "47bcfe8e81a325669817798d120f7e5c1dcb78c8eafff198ea6ded00c9c769b5",
	name: "listMenuItems",
	filename: "src/lib/server/bakery.ts"
}, (opts) => listMenuItems.__executeServer(opts));
var listMenuItems = createServerFn({ method: "GET" }).handler(listMenuItems_createServerFn_handler, async () => {
	return (await (await getSql()).query(`${ITEM_SELECT} group by m.id order by m.sort_order asc`)).map(mapItem);
});
var getMenuItem_createServerFn_handler = createServerRpc({
	id: "acb79a0707ae1ccb42406c937387f4bf65b7b92f234454b6cac8dfb08440fa0a",
	name: "getMenuItem",
	filename: "src/lib/server/bakery.ts"
}, (opts) => getMenuItem.__executeServer(opts));
var getMenuItem = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getMenuItem_createServerFn_handler, async ({ data: slug }) => {
	const rows = await (await getSql()).query(`${ITEM_SELECT} where m.slug = $1 group by m.id`, [slug]);
	return rows[0] ? mapItem(rows[0]) : null;
});
var listRatings_createServerFn_handler = createServerRpc({
	id: "215191a8922f4a0d6dee64c89f95606382138d400821931c1f11eaee678a0188",
	name: "listRatings",
	filename: "src/lib/server/bakery.ts"
}, (opts) => listRatings.__executeServer(opts));
var listRatings = createServerFn({ method: "GET" }).validator((itemId) => itemId).handler(listRatings_createServerFn_handler, async ({ data: itemId }) => {
	return (await (await getSql()).query(`select id, stars, comment, created_at, user_id
       from ratings
       where item_id = $1
       order by created_at desc
       limit 24`, [itemId])).map((row) => ({
		id: row.id,
		stars: Number(row.stars),
		comment: row.comment,
		createdAt: String(row.created_at)
	}));
});
var getMyRating_createServerFn_handler = createServerRpc({
	id: "99b30eca21e075a903c7250ea15327c71c764cfc85a7fedd859f17fab1ece634",
	name: "getMyRating",
	filename: "src/lib/server/bakery.ts"
}, (opts) => getMyRating.__executeServer(opts));
var getMyRating = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((itemId) => itemId).handler(getMyRating_createServerFn_handler, async ({ context, data: itemId }) => {
	const row = (await (await getSql()).query(`select id, stars, comment, created_at, user_id
       from ratings where item_id = $1 and user_id = $2`, [itemId, context.userId]))[0];
	if (!row) return null;
	return {
		id: row.id,
		stars: Number(row.stars),
		comment: row.comment,
		createdAt: String(row.created_at),
		isMine: true
	};
});
var ratingSchema = object({
	itemId: number().int().positive(),
	stars: number().int().min(1).max(5),
	comment: string().max(400).optional()
});
var upsertRating_createServerFn_handler = createServerRpc({
	id: "22b4990971cf1283388200da678c848b9ced72b6c51d9836beb81f6013bb3ad7",
	name: "upsertRating",
	filename: "src/lib/server/bakery.ts"
}, (opts) => upsertRating.__executeServer(opts));
var upsertRating = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ratingSchema.parse(input)).handler(upsertRating_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const comment = data.comment?.trim() || null;
	await sql.query(`insert into ratings (user_id, item_id, stars, comment)
       values ($1, $2, $3, $4)
       on conflict (user_id, item_id)
       do update set stars = excluded.stars, comment = excluded.comment, created_at = now()`, [
		context.userId,
		data.itemId,
		data.stars,
		comment
	]);
	return { ok: true };
});
var orderLineSchema = object({
	itemId: number().int().positive(),
	quantity: number().int().min(1).max(200)
});
var orderSchema = object({
	kind: _enum([
		"pickup",
		"bulk",
		"catering"
	]),
	eventDate: string().min(1),
	eventTime: string().min(1),
	guestCount: number().int().min(1).max(500).optional(),
	contactName: string().trim().min(1).max(80),
	contactPhone: string().trim().min(7).max(40),
	notes: string().max(800).optional(),
	lines: array(orderLineSchema).min(1)
});
var createOrder_createServerFn_handler = createServerRpc({
	id: "464c08bf6529aade1216c8092bcae323f11c6a8e3654c068a92a83a31ff022a4",
	name: "createOrder",
	filename: "src/lib/server/bakery.ts"
}, (opts) => createOrder.__executeServer(opts));
var createOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => orderSchema.parse(input)).handler(createOrder_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const ids = data.lines.map((line) => line.itemId);
	const placeholders = ids.map((_, i) => `$${i + 1}`).join(", ");
	const items = await sql.query(`select id, price_cents from menu_items where id in (${placeholders})`, ids);
	if (items.length !== ids.length) throw new Error("One or more menu items are no longer available.");
	const priceById = new Map(items.map((item) => [item.id, item.price_cents]));
	const orderId = (await sql.query(`insert into orders (
         user_id, kind, status, event_date, event_time, guest_count,
         contact_name, contact_phone, notes
       ) values ($1, $2, 'requested', $3, $4, $5, $6, $7, $8)
       returning id`, [
		context.userId,
		data.kind,
		data.eventDate,
		data.eventTime,
		data.guestCount ?? null,
		data.contactName,
		data.contactPhone,
		data.notes?.trim() || null
	]))[0]?.id;
	if (!orderId) throw new Error("Could not create the order.");
	for (const line of data.lines) {
		const unit = priceById.get(line.itemId);
		if (unit === void 0) continue;
		await sql.query(`insert into order_items (order_id, item_id, quantity, unit_price_cents)
         values ($1, $2, $3, $4)`, [
			orderId,
			line.itemId,
			line.quantity,
			unit
		]);
	}
	return { id: orderId };
});
var listMyOrders_createServerFn_handler = createServerRpc({
	id: "d6e0888a4c078c403b1e9aaf6ab8f3606b8e2b13af317c915f7be62e3efb710e",
	name: "listMyOrders",
	filename: "src/lib/server/bakery.ts"
}, (opts) => listMyOrders.__executeServer(opts));
var listMyOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyOrders_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const orders = await sql.query(`select id, kind, status, event_date, event_time, guest_count, notes, created_at
       from orders where user_id = $1 order by created_at desc`, [context.userId]);
	if (orders.length === 0) return [];
	const orderIds = orders.map((order) => order.id);
	const placeholders = orderIds.map((_, i) => `$${i + 1}`).join(", ");
	const lines = await sql.query(`select oi.order_id, m.name, oi.quantity, oi.unit_price_cents
       from order_items oi
       join menu_items m on m.id = oi.item_id
       where oi.order_id in (${placeholders})`, orderIds);
	const byOrder = /* @__PURE__ */ new Map();
	for (const line of lines) {
		const list = byOrder.get(line.order_id) ?? [];
		list.push({
			name: line.name,
			quantity: Number(line.quantity),
			unitPriceCents: Number(line.unit_price_cents)
		});
		byOrder.set(line.order_id, list);
	}
	return orders.map((order) => ({
		id: order.id,
		kind: order.kind,
		status: order.status,
		eventDate: order.event_date,
		eventTime: order.event_time,
		guestCount: order.guest_count === null ? null : Number(order.guest_count),
		notes: order.notes,
		createdAt: String(order.created_at),
		items: byOrder.get(order.id) ?? []
	}));
});
//#endregion
export { createOrder_createServerFn_handler, getMenuItem_createServerFn_handler, getMyRating_createServerFn_handler, listMenuItems_createServerFn_handler, listMyOrders_createServerFn_handler, listRatings_createServerFn_handler, upsertRating_createServerFn_handler };

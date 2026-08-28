import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { OrderSummary } from "@/lib/bakery";
import { brandLabel, type CardBrand } from "@/lib/payment";
import { listMyOrders, payOrder } from "@/lib/server/bakery";
import { formatPrice } from "@/lib/utils";
import { CardFields, type CardDraft } from "@/components/card-fields";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

const KIND_LABEL: Record<string, string> = {
  pickup: "Pickup",
  bulk: "Bulk bake",
  catering: "Catering",
};

const emptyCard: CardDraft = { name: "", number: "", expiry: "", cvc: "" };

function OrdersPage() {
  const { user, isPending } = useCurrentUserState();
  const [orders, setOrders] = useState<OrderSummary[] | null>(null);
  const [ready, setReady] = useState(false);
  const [paying, setPaying] = useState<OrderSummary | null>(null);
  const [card, setCard] = useState<CardDraft>(emptyCard);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!user) return;
    listMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [user]);

  if (!ready || isPending) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
        <div className="h-32 animate-pulse rounded-xl bg-secondary" />
      </main>
    );
  }

  if (!user) return <RedirectToSignIn />;

  const payTotal = paying
    ? paying.items.reduce((sum, item) => sum + item.quantity * item.unitPriceCents, 0)
    : 0;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        Account
      </p>
      <h1 className="mt-2 font-display text-4xl">Your orders</h1>
      <p className="mt-3 text-muted">Requests you’ve sent to the bakery.</p>

      {orders === null ? (
        <div className="mt-8 h-32 animate-pulse rounded-xl bg-secondary" />
      ) : orders.length === 0 ? (
        <div className="mt-10">
          <p className="text-muted">No requests yet.</p>
          <Button asChild className="mt-6">
            <Link to="/menu">Start from the menu</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + item.quantity * item.unitPriceCents,
              0,
            );
            const paid = order.paymentStatus === "paid";
            return (
              <li
                key={order.id}
                className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl">
                      {KIND_LABEL[order.kind] ?? order.kind} #{order.id}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {order.eventDate}
                      {order.eventTime ? ` · ${order.eventTime}` : ""}
                      {order.guestCount ? ` · ${order.guestCount} guests` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">{order.status}</Badge>
                    <Badge>{paid ? "Paid" : "Pay at pickup"}</Badge>
                  </div>
                </div>
                <ul className="mt-4 space-y-1 text-sm">
                  {order.items.map((item) => (
                    <li key={item.name} className="flex justify-between gap-3">
                      <span>
                        {item.name}{" "}
                        <span className="text-muted tabular-nums">×{item.quantity}</span>
                      </span>
                      <span className="tabular-nums">
                        {formatPrice(item.unitPriceCents * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium tabular-nums">
                    {formatPrice(total)}
                    {paid && order.cardLast4 && (
                      <span className="ml-2 font-normal text-muted">
                        {brandLabel((order.cardBrand as CardBrand) || "card")} · ••••{" "}
                        {order.cardLast4}
                      </span>
                    )}
                  </p>
                  {!paid && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        setCard(emptyCard);
                        setPaying(order);
                      }}
                    >
                      Pay now
                    </Button>
                  )}
                </div>
                {order.notes && (
                  <p className="mt-2 text-sm text-muted">{order.notes}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <Sheet
        open={paying !== null}
        onOpenChange={(open) => {
          if (!open) setPaying(null);
        }}
      >
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Pay online</SheetTitle>
            <SheetDescription>
              {paying
                ? `Charge ${formatPrice(payTotal)} for order #${paying.id}.`
                : "Pay this order with a card."}
            </SheetDescription>
          </SheetHeader>
          <form
            className="flex flex-col gap-4 p-6"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!paying) return;
              setSubmitting(true);
              try {
                const result = await payOrder({
                  data: { orderId: paying.id, card },
                });
                setOrders(
                  (current) =>
                    current?.map((order) =>
                      order.id === paying.id
                        ? {
                            ...order,
                            paymentMethod: "online",
                            paymentStatus: "paid",
                            paidCents: result.paidCents,
                            cardLast4: result.cardLast4,
                            cardBrand: result.cardBrand,
                          }
                        : order,
                    ) ?? current,
                );
                setPaying(null);
                setCard(emptyCard);
                toast.success("Payment received");
              } catch (err) {
                const message =
                  err instanceof Error ? err.message : "Could not take payment.";
                toast.error(message === "Unauthorized" ? "Sign in to pay." : message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <CardFields value={card} onChange={setCard} disabled={submitting} />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Paying…" : `Pay ${formatPrice(payTotal)}`}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </main>
  );
}

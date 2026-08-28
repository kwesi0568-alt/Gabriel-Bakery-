import { Link } from "@tanstack/react-router";
import { Banknote, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { OrderKind, PaymentMethod, PaymentStatus } from "@/lib/bakery";
import { cartTotal, useCart, useHydratedCart } from "@/lib/cart-store";
import { createOrder } from "@/lib/server/bakery";
import { formatPrice } from "@/lib/utils";
import { CardFields, type CardDraft } from "@/components/card-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const KINDS: { id: OrderKind; label: string; hint: string }[] = [
  { id: "pickup", label: "Shop pickup", hint: "Ready at the counter" },
  { id: "bulk", label: "Bulk bake", hint: "Dozens for the office or table" },
  { id: "catering", label: "Catering", hint: "Events, trays, and service" },
];

const emptyCard: CardDraft = { name: "", number: "", expiry: "", cvc: "" };

export function OrderForm({ defaultKind = "pickup" }: { defaultKind?: OrderKind }) {
  const { user, isPending } = useCurrentUserState();
  const { lines } = useHydratedCart();
  const clear = useCart((s) => s.clear);
  const [kind, setKind] = useState<OrderKind>(defaultKind);
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState(defaultKind === "pickup" ? "09:00" : "10:00");
  const [guestCount, setGuestCount] = useState(defaultKind === "catering" ? "24" : "1");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [card, setCard] = useState<CardDraft>(emptyCard);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{
    id: number;
    paymentStatus: PaymentStatus;
    cardLast4: string | null;
    paidCents: number | null;
  } | null>(null);
  const [minDate, setMinDate] = useState("");
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => setAuthReady(true), []);
  useEffect(() => {
    const next = new Date();
    next.setDate(next.getDate() + 1);
    setMinDate(next.toISOString().slice(0, 10));
  }, []);

  const total = cartTotal(lines);
  const showAuthSkeleton = !authReady || isPending;

  if (done) {
    const paid = done.paymentStatus === "paid";
    return (
      <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium tracking-[0.16em] text-primary uppercase">
          {paid ? "Paid" : "Request received"}
        </p>
        <h2 className="mt-2 font-display text-3xl">
          {paid ? "You’re set" : "We’ll be in touch"}
        </h2>
        <p className="mt-3 max-w-md text-muted">
          Order #{done.id} is with the bakery.
          {paid && done.paidCents !== null
            ? ` We charged ${formatPrice(done.paidCents)}${done.cardLast4 ? ` to •••• ${done.cardLast4}` : ""}.`
            : " Pay at the counter when you pick up. We confirm bulk and catering by phone the same business day."}
        </p>
        <Button asChild className="mt-6">
          <Link to="/orders">View your orders</Link>
        </Button>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (lines.length === 0) {
      toast.error("Add something from the menu first.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await createOrder({
        data: {
          kind,
          eventDate,
          eventTime,
          guestCount:
            kind === "pickup" ? undefined : Math.max(1, Number(guestCount) || 1),
          contactName,
          contactPhone,
          notes: notes.trim() || undefined,
          lines: lines.map((line) => ({
            itemId: line.itemId,
            quantity: line.qty,
          })),
          paymentMethod,
          card: paymentMethod === "online" ? card : undefined,
        },
      });
      clear();
      setCard(emptyCard);
      setDone({
        id: result.id,
        paymentStatus: result.paymentStatus,
        cardLast4: result.cardLast4,
        paidCents: result.paidCents,
      });
      toast.success(result.paymentStatus === "paid" ? "Payment received" : "Request sent");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not send the request.";
      if (message === "Unauthorized") {
        toast.error("Sign in to schedule an order.");
      } else {
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset className="grid gap-2 sm:grid-cols-3">
        <legend className="sr-only">Order type</legend>
        {KINDS.map((option) => (
          <label
            key={option.id}
            className={`flex min-h-20 cursor-pointer flex-col justify-center rounded-lg px-4 py-3 shadow-[var(--shadow-border)] transition-[box-shadow,background-color] ${
              kind === option.id ? "bg-secondary" : "bg-card hover:bg-surface"
            }`}
          >
            <input
              type="radio"
              name="kind"
              value={option.id}
              checked={kind === option.id}
              onChange={() => setKind(option.id)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{option.label}</span>
            <span className="text-xs text-muted">{option.hint}</span>
          </label>
        ))}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="event-date">
            {kind === "pickup" ? "Pickup date" : "Event date"}
          </Label>
          <Input
            id="event-date"
            type="date"
            required
            min={minDate || undefined}
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="event-time">
            {kind === "pickup" ? "Pickup time" : "Start time"}
          </Label>
          <Input
            id="event-time"
            type="time"
            required
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
        {kind !== "pickup" && (
          <div className="space-y-1.5">
            <Label htmlFor="guests">Guest count</Label>
            <Input
              id="guests"
              type="number"
              min={1}
              max={500}
              required
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="contact-name">Your name</Label>
          <Input
            id="contact-name"
            required
            autoComplete="name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input
            id="contact-phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="We’ll confirm on this number"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Allergies, delivery notes, or a short event brief"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Payment</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          <label
            className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-lg px-4 py-3 shadow-[var(--shadow-border)] transition-[box-shadow,background-color] ${
              paymentMethod === "online" ? "bg-secondary" : "bg-card hover:bg-surface"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
              className="sr-only"
            />
            <CreditCard className="mt-0.5 size-4 shrink-0" />
            <span>
              <span className="block text-sm font-medium">Pay now</span>
              <span className="block text-xs text-muted">
                Card charged for {formatPrice(total)}
              </span>
            </span>
          </label>
          <label
            className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-lg px-4 py-3 shadow-[var(--shadow-border)] transition-[box-shadow,background-color] ${
              paymentMethod === "pickup" ? "bg-secondary" : "bg-card hover:bg-surface"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="pickup"
              checked={paymentMethod === "pickup"}
              onChange={() => setPaymentMethod("pickup")}
              className="sr-only"
            />
            <Banknote className="mt-0.5 size-4 shrink-0" />
            <span>
              <span className="block text-sm font-medium">Pay at pickup</span>
              <span className="block text-xs text-muted">
                Card or cash at the counter
              </span>
            </span>
          </label>
        </div>
        {paymentMethod === "online" && (
          <CardFields value={card} onChange={setCard} disabled={submitting} />
        )}
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Estimated total{" "}
          <span className="font-medium text-fg tabular-nums">{formatPrice(total)}</span>
          {kind !== "pickup" ? " · we adjust if the bake changes" : ""}
        </p>
        {showAuthSkeleton ? (
          <div className="h-11 w-40 animate-pulse rounded-md bg-secondary" />
        ) : user ? (
          <Button type="submit" disabled={submitting || lines.length === 0}>
            {submitting
              ? paymentMethod === "online"
                ? "Paying…"
                : "Sending…"
              : paymentMethod === "online"
                ? `Pay ${formatPrice(total)}`
                : "Send request"}
          </Button>
        ) : (
          <Button asChild>
            <Link to="/login">Sign in to pay</Link>
          </Button>
        )}
      </div>
    </form>
  );
}

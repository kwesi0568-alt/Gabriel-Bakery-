import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cartTotal, useCart, useHydratedCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { OrderForm } from "@/components/order-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { lines, hydrated } = useHydratedCart();
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const total = cartTotal(lines);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        Your selection
      </p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">Cart</h1>

      {!hydrated ? (
        <div className="mt-10 h-32 max-w-xl animate-pulse rounded-xl bg-secondary" />
      ) : lines.length === 0 ? (
        <div className="mt-10 max-w-lg">
          <p className="text-muted">
            Nothing selected yet. Browse the case and add what you want for
            pickup or a larger order.
          </p>
          <Button asChild className="mt-6">
            <Link to="/menu">Browse the menu</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <ul className="space-y-3">
            {lines.map((line) => (
              <li
                key={line.itemId}
                className="flex gap-4 rounded-xl bg-card p-3 shadow-[var(--shadow-border)] sm:p-4"
              >
                <img
                  src={line.imagePath}
                  alt=""
                  className="size-20 shrink-0 rounded-md object-cover sm:size-24"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      to="/menu/$slug"
                      params={{ slug: line.slug }}
                      className="font-display text-xl leading-snug hover:text-primary"
                    >
                      {line.name}
                    </Link>
                    <p className="shrink-0 font-medium tabular-nums">
                      {formatPrice(line.priceCents * line.qty)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-muted tabular-nums">
                    {formatPrice(line.priceCents)} each
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center rounded-md bg-surface shadow-[var(--shadow-border)]">
                      <button
                        type="button"
                        className="grid size-11 place-items-center"
                        aria-label={`Decrease ${line.name}`}
                        onClick={() => setQty(line.itemId, line.qty - 1)}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="min-w-8 text-center tabular-nums">{line.qty}</span>
                      <button
                        type="button"
                        className="grid size-11 place-items-center"
                        aria-label={`Increase ${line.name}`}
                        onClick={() => setQty(line.itemId, line.qty + 1)}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="grid size-11 place-items-center rounded-md text-muted hover:bg-secondary hover:text-fg"
                      aria-label={`Remove ${line.name}`}
                      onClick={() => remove(line.itemId)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-xl bg-card p-5 shadow-[var(--shadow-border)] lg:sticky lg:top-24">
            <p className="text-sm text-muted">Estimated total</p>
            <p className="mt-1 font-display text-3xl tabular-nums">{formatPrice(total)}</p>
            <p className="mt-2 text-xs text-muted">
              Pay online when you send the request, or settle at the counter.
            </p>
            <Button asChild variant="outline" className="mt-5 w-full">
              <Link to="/menu">Add more</Link>
            </Button>
          </aside>
        </div>
      )}

      {lines.length > 0 && (
        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-3xl">Schedule pickup or a larger bake</h2>
          <p className="mt-2 text-sm text-muted">
            Shop pickup needs a day’s notice. Bulk and catering need two days
            or more.
          </p>
          <div className="mt-6">
            <OrderForm defaultKind="pickup" />
          </div>
        </section>
      )}
    </main>
  );
}

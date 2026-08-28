import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { MenuItem } from "@/lib/bakery";
import { useCart, useHydratedCart } from "@/lib/cart-store";
import { listMenuItems } from "@/lib/server/bakery";
import { formatPrice } from "@/lib/utils";
import { OrderForm } from "@/components/order-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/catering")({ component: CateringPage });

const PACKAGES = [
  {
    title: "Morning tray",
    detail: "A mix of croissants, morning buns, and danishes. Coffee not included — we bake, we don’t brew for events.",
    serves: "12 guests",
    add: [
      { slug: "butter-croissant", qty: 6 },
      { slug: "morning-bun", qty: 6 },
      { slug: "almond-croissant", qty: 4 },
    ],
  },
  {
    title: "Bread board",
    detail: "Sourdough, rye, and focaccia with enough crust for a long lunch table.",
    serves: "16 guests",
    add: [
      { slug: "country-sourdough", qty: 2 },
      { slug: "seeded-rye", qty: 1 },
      { slug: "olive-focaccia", qty: 1 },
    ],
  },
  {
    title: "Dessert table",
    detail: "One whole cake and a tart, plus kouign-amann for the people who want something they can hold.",
    serves: "20 guests",
    add: [
      { slug: "olive-oil-citrus-cake", qty: 1 },
      { slug: "seasonal-fruit-tart", qty: 1 },
      { slug: "kouign-amann", qty: 12 },
    ],
  },
];

function CateringPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const add = useCart((s) => s.add);
  const { lines } = useHydratedCart();

  useEffect(() => {
    listMenuItems()
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  function addPackage(
    packTitle: string,
    slugs: { slug: string; qty: number }[],
  ) {
    for (const entry of slugs) {
      const item = items.find((row) => row.slug === entry.slug);
      if (!item) continue;
      add(
        {
          itemId: item.id,
          slug: item.slug,
          name: item.name,
          priceCents: item.priceCents,
          imagePath: item.imagePath,
        },
        entry.qty,
      );
    }
    toast.success(`${packTitle} added to your request`);
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        Events & offices
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl sm:text-5xl">
        Bulk orders and catering
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Two days’ notice for a bulk bake. A week is kinder for full catering.
        Start with a package or build from the menu, then send the date.
      </p>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {PACKAGES.map((pack) => (
          <article
            key={pack.title}
            className="flex flex-col rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
          >
            <h2 className="font-display text-2xl">{pack.title}</h2>
            <p className="mt-1 text-xs font-medium tracking-wide text-primary uppercase">
              {pack.serves}
            </p>
            <p className="mt-3 flex-1 text-sm text-muted">{pack.detail}</p>
            <Button
              type="button"
              variant="outline"
              className="mt-5"
              disabled={items.length === 0}
              onClick={() => addPackage(pack.title, pack.add)}
            >
              Add this mix
            </Button>
          </article>
        ))}
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="font-display text-3xl">Send the request</h2>
          <p className="mt-2 text-sm text-muted">
            {lines.length === 0 ? (
              <>
                Add a package above or{" "}
                <Link to="/menu" className="font-medium text-primary">
                  choose from the menu
                </Link>
                .
              </>
            ) : (
              `${lines.length} item${lines.length === 1 ? "" : "s"} in your selection.`
            )}
          </p>
          <div className="mt-6">
            <OrderForm defaultKind="catering" />
          </div>
        </div>
        <aside className="h-fit rounded-xl bg-surface p-5">
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
            In this request
          </p>
          {lines.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nothing selected yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {lines.map((line) => (
                <li key={line.itemId} className="flex justify-between gap-3">
                  <span>
                    {line.name}{" "}
                    <span className="text-muted tabular-nums">×{line.qty}</span>
                  </span>
                  <span className="tabular-nums">
                    {formatPrice(line.priceCents * line.qty)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Button asChild variant="ghost" className="mt-4 w-full">
            <Link to="/cart">Edit selection</Link>
          </Button>
        </aside>
      </section>
    </main>
  );
}

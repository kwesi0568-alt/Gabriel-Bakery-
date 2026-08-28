import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, type MenuItem } from "@/lib/bakery";
import { listMenuItems } from "@/lib/server/bakery";
import { cn } from "@/lib/utils";
import { MenuCard } from "@/components/menu-card";

export const Route = createFileRoute("/menu/")({ component: MenuPage });

function MenuPage() {
  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    listMenuItems()
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  const visible = useMemo(() => {
    if (!items) return [];
    if (category === "all") return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        The case
      </p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">Menu</h1>
      <p className="mt-3 max-w-xl text-muted">
        Add what you want, then schedule pickup or a larger bake. Availability
        is best in the morning.
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={cn(
              "h-11 shrink-0 rounded-full px-4 text-sm transition-colors",
              category === cat.id
                ? "bg-primary text-primary-fg"
                : "bg-card text-muted shadow-[var(--shadow-border)] hover:text-fg",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items === null
          ? Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="aspect-4/3 animate-pulse rounded-xl bg-secondary" />
            ))
          : visible.map((item) => <MenuCard key={item.id} item={item} />)}
      </div>
    </main>
  );
}

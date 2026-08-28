import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/bakery";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { StarRow } from "@/components/stars";
import { toast } from "sonner";

export function MenuCard({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]">
      <Link to="/menu/$slug" params={{ slug: item.slug }} className="block">
        <div className="aspect-4/3 overflow-hidden bg-secondary">
          <img
            src={item.imagePath}
            alt={item.name}
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to="/menu/$slug"
              params={{ slug: item.slug }}
              className="font-display text-xl font-medium leading-snug text-fg hover:text-primary"
            >
              {item.name}
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{item.description}</p>
          </div>
          <p className="shrink-0 font-medium tabular-nums">{formatPrice(item.priceCents)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          {item.ratingCount > 0 && item.avgStars !== null ? (
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <StarRow value={item.avgStars} />
              <span className="tabular-nums">
                {item.avgStars.toFixed(1)} · {item.ratingCount}
              </span>
            </span>
          ) : (
            <span className="text-xs text-muted">Not rated yet</span>
          )}
          <button
            type="button"
            onClick={() => {
              add({
                itemId: item.id,
                slug: item.slug,
                name: item.name,
                priceCents: item.priceCents,
                imagePath: item.imagePath,
              });
              toast.success(`${item.name} added`);
            }}
            className="inline-flex h-11 items-center gap-1.5 rounded-md bg-primary px-3.5 text-sm font-medium text-primary-fg transition-[background-color,transform] duration-150 hover:bg-primary/92 active:scale-[0.96]"
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

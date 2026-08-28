import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { MenuItem, Rating } from "@/lib/bakery";
import { useCart } from "@/lib/cart-store";
import { getMenuItem, getMyRating, listRatings, upsertRating } from "@/lib/server/bakery";
import { formatPrice } from "@/lib/utils";
import { StarPicker, StarRow } from "@/components/stars";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/menu/$slug")({ component: ItemPage });

function ItemPage() {
  const { slug } = Route.useParams();
  const [item, setItem] = useState<MenuItem | null | undefined>(undefined);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [mine, setMine] = useState<Rating | null>(null);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const { user, isPending } = useCurrentUserState();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => setAuthReady(true), []);

  useEffect(() => {
    let cancelled = false;
    setItem(undefined);
    getMenuItem({ data: slug })
      .then((found) => {
        if (cancelled) return;
        setItem(found);
        if (found) {
          listRatings({ data: found.id })
            .then((rows) => {
              if (!cancelled) setRatings(rows);
            })
            .catch(() => {
              if (!cancelled) setRatings([]);
            });
        }
      })
      .catch(() => {
        if (!cancelled) setItem(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!item || !user) {
      setMine(null);
      return;
    }
    getMyRating({ data: item.id })
      .then(setMine)
      .catch(() => setMine(null));
  }, [item, user]);

  if (item === undefined) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
        <div className="aspect-4/3 max-w-xl animate-pulse rounded-xl bg-secondary" />
      </main>
    );
  }

  if (!item) {
    return (
      <main className="mx-auto max-w-xl flex-1 px-4 py-20 text-center">
        <h1 className="font-display text-3xl">That item isn’t on the board</h1>
        <Button asChild className="mt-6">
          <Link to="/menu">Back to the menu</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        <Link to="/menu" className="hover:text-fg">
          Menu
        </Link>
        <span className="mx-2">/</span>
        {item.category}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-secondary">
          <img
            src={item.imagePath}
            alt={item.name}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">{item.name}</h1>
          <p className="mt-2 font-display text-2xl tabular-nums">
            {formatPrice(item.priceCents)}
          </p>
          {item.ratingCount > 0 && item.avgStars !== null && (
            <p className="mt-3 flex items-center gap-2 text-sm text-muted">
              <StarRow value={item.avgStars} size="md" />
              <span className="tabular-nums">
                {item.avgStars.toFixed(1)} from {item.ratingCount}{" "}
                {item.ratingCount === 1 ? "rating" : "ratings"}
              </span>
            </p>
          )}
          <p className="mt-5 text-muted">{item.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {item.serves && (
              <div>
                <dt className="text-muted">Serves</dt>
                <dd className="mt-0.5">{item.serves}</dd>
              </div>
            )}
            {item.allergens && (
              <div>
                <dt className="text-muted">Contains</dt>
                <dd className="mt-0.5">{item.allergens}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md bg-card shadow-[var(--shadow-border)]">
              <button
                type="button"
                className="grid size-11 place-items-center"
                aria-label="Decrease quantity"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-8 text-center tabular-nums">{qty}</span>
              <button
                type="button"
                className="grid size-11 place-items-center"
                aria-label="Increase quantity"
                onClick={() => setQty((n) => Math.min(200, n + 1))}
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              onClick={() => {
                add(
                  {
                    itemId: item.id,
                    slug: item.slug,
                    name: item.name,
                    priceCents: item.priceCents,
                    imagePath: item.imagePath,
                  },
                  qty,
                );
                toast.success(`${item.name} added`);
              }}
            >
              Add to order
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-16 max-w-2xl">
        <h2 className="font-display text-3xl">Rate this bake</h2>
        {!authReady || isPending ? (
          <div className="mt-4 h-24 animate-pulse rounded-xl bg-secondary" />
        ) : user ? (
          <RatingForm
            itemId={item.id}
            initial={mine}
            onSaved={async () => {
              const [freshItem, rows, my] = await Promise.all([
                getMenuItem({ data: slug }),
                listRatings({ data: item.id }),
                getMyRating({ data: item.id }),
              ]);
              if (freshItem) setItem(freshItem);
              setRatings(rows);
              setMine(my);
            }}
          />
        ) : (
          <p className="mt-3 text-sm text-muted">
            <Link to="/login" className="font-medium text-primary">
              Sign in
            </Link>{" "}
            to leave a rating.
          </p>
        )}

        <ul className="mt-8 space-y-4">
          {ratings.length === 0 ? (
            <li className="text-sm text-muted">No ratings yet. Be the first.</li>
          ) : (
            ratings.map((rating) => (
              <li
                key={rating.id}
                className="rounded-lg bg-card px-4 py-3 shadow-[var(--shadow-border)]"
              >
                <StarRow value={rating.stars} />
                {rating.comment && (
                  <p className="mt-2 text-sm">{rating.comment}</p>
                )}
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

function RatingForm({
  itemId,
  initial,
  onSaved,
}: {
  itemId: number;
  initial: Rating | null;
  onSaved: () => Promise<void>;
}) {
  const [stars, setStars] = useState(initial?.stars ?? 0);
  const [comment, setComment] = useState(initial?.comment ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setStars(initial?.stars ?? 0);
    setComment(initial?.comment ?? "");
  }, [initial]);

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (stars < 1) {
          toast.error("Choose a star rating.");
          return;
        }
        setSaving(true);
        try {
          await upsertRating({
            data: { itemId, stars, comment: comment.trim() || undefined },
          });
          toast.success("Rating saved");
          await onSaved();
        } catch (err) {
          const message = err instanceof Error ? err.message : "Could not save.";
          toast.error(message === "Unauthorized" ? "Sign in to rate." : message);
        } finally {
          setSaving(false);
        }
      }}
    >
      <StarPicker value={stars} onChange={setStars} disabled={saving} />
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="What should we keep doing?"
        maxLength={400}
      />
      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : initial ? "Update rating" : "Submit rating"}
      </Button>
    </form>
  );
}

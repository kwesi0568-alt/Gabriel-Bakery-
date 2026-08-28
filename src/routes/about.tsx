import { createFileRoute, Link } from "@tanstack/react-router";
import { BAKERY } from "@/lib/bakery";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({ component: About });

const VALUES = [
  {
    title: "Flour",
    body: "We mill a portion of our wheat in-house and buy the rest from two farms we visit every harvest. Flavor starts there, not in a mix.",
  },
  {
    title: "Time",
    body: "Sourdough ferments overnight. Croissants laminate over two days. Nothing here is rushed to fill a case.",
  },
  {
    title: "Fire",
    body: "Bread on the stone, pastry in a deck oven. Heat is a craft, and we still watch the bake instead of a timer alone.",
  },
];

function About() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          About us
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          Named for the baker who still opens the shop
        </h1>
        <p className="mt-5 text-lg text-muted">
          Gabriel Bakery is a small shop on Lark Street. We bake bread, pastry,
          and a few cakes — enough to feed the block, and the occasional
          wedding down the hill.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="overflow-hidden rounded-xl">
          <img
            src="/images/about.jpg"
            alt="Gabriel scoring dough at the bench"
            className="aspect-4/3 w-full object-cover md:aspect-21/9"
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-4 pb-16 text-base leading-relaxed text-fg/90 sm:px-6">
        <p>
          Gabriel Atta learned to bake in his uncle’s kitchen outside Lyon,
          then spent a decade in hotel pastry before deciding he wanted a door
          he could unlock himself. In {BAKERY.founded} he found a narrow
          storefront with a broken oven and a good landlord. The first loaf came
          out of that oven the same week.
        </p>
        <p>
          The shop has grown only as much as the neighborhood asked it to. We
          added laminated pastry when people started lining up for the leftover
          croissant. Cakes arrived later, for the birthdays we were already
          invited to. Catering followed because offices on Vine Street kept
          calling for “whatever you have, times thirty.”
        </p>
        <p>
          We are still a bakery first. If you come in the morning you’ll smell
          the mill. If you come at noon there may be nothing left but rye and a
          single kouign-amann. That’s by design.
        </p>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
              <h2 className="font-display text-2xl">{value.title}</h2>
              <p className="mt-3 text-sm text-muted">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Visit</h2>
          <p className="mt-4 text-muted">
            {BAKERY.address}
            {BAKERY.city ? (
              <>
                <br />
                {BAKERY.city}
              </>
            ) : null}
          </p>
          <p className="mt-3 text-sm">
            {BAKERY.phone}
            <br />
            {BAKERY.email}
          </p>
          <Button asChild className="mt-6">
            <Link to="/menu">See what’s in the case</Link>
          </Button>
        </div>
        <ul className="space-y-3 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
          {BAKERY.hours.map((row) => (
            <li key={row.day} className="flex justify-between gap-4 text-sm">
              <span className="text-muted">{row.day}</span>
              <span className="tabular-nums">{row.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

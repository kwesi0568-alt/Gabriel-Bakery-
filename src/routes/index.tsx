import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BAKERY, type MenuItem } from "@/lib/bakery";
import { listMenuItems } from "@/lib/server/bakery";
import { MenuCard } from "@/components/menu-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [featured, setFeatured] = useState<MenuItem[] | null>(null);

  useEffect(() => {
    listMenuItems()
      .then((items) => setFeatured(items.filter((item) => item.featured).slice(0, 4)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <main>
      <section className="relative min-h-[78dvh] overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="The bakery counter at opening hour"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-fg/75 via-fg/25 to-fg/15" />
        <div className="relative mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6 sm:pb-20">
          <p className="text-xs font-medium tracking-[0.2em] text-primary-fg/80 uppercase">
            United Arab Emirates • Since {BAKERY.founded}
          </p>
          <h1 className="mt-3 max-w-xl font-display text-5xl font-medium text-primary-fg sm:text-6xl md:text-7xl">
            Baked before dawn
          </h1>
          <p className="mt-4 max-w-md text-base text-primary-fg/85 sm:text-lg">
            Naturally leavened bread, laminated pastry, and cakes for the table.
            Come early — we sell out.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/menu">
                Browse the menu
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-0 bg-primary-fg/12 text-primary-fg shadow-none hover:bg-primary-fg/20"
            >
              <Link to="/catering">Plan catering</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              From the case
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">What we bake today</h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex h-11 items-center text-sm font-medium text-primary"
          >
            Full menu
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured === null
            ? Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="aspect-4/3 animate-pulse rounded-xl bg-secondary" />
              ))
            : featured.map((item) => <MenuCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/images/about.jpg"
              alt="Gabriel scoring a country sourdough loaf"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
              The shop
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              A neighborhood bakery, not a brand
            </h2>
            <p className="mt-4 text-muted">
              Gabriel Atta opened the doors in 2014 with one stone mill and a
              stubborn belief that bread should take the time it takes. We still
              mix at night, bake before dawn, and know the people who come back
              for the heel of the rye.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/about">Our story</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
            Hours
          </p>
          <ul className="mt-5 space-y-3">
            {BAKERY.hours.map((row) => (
              <li key={row.day} className="flex justify-between gap-4 text-sm">
                <span className="text-muted">{row.day}</span>
                <span className="tabular-nums">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-primary p-6 text-primary-fg sm:p-8">
          <p className="text-xs font-medium tracking-[0.18em] uppercase opacity-80">
            Tables & offices
          </p>
          <h2 className="mt-2 font-display text-3xl">Need a tray, or fifty loaves?</h2>
          <p className="mt-3 text-primary-fg/85">
            Two days’ notice for bulk bakes. A week for full catering. We’ll
            help you choose the right mix.
          </p>
          <Button
            asChild
            className="mt-6 bg-primary-fg text-fg hover:bg-primary-fg/90"
          >
            <Link to="/catering">Schedule an order</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

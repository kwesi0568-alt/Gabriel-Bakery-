import { Link } from "@tanstack/react-router";
import { BAKERY } from "@/lib/bakery";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Gabriel Bakery</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{BAKERY.tagline}</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Visit</p>
          <p className="mt-3 text-sm">
            {BAKERY.address}
            {BAKERY.city ? (
              <>
                <br />
                {BAKERY.city}
              </>
            ) : null}
          </p>
          <p className="mt-2 text-sm text-muted">{BAKERY.phone}</p>
          <p className="text-sm text-muted">{BAKERY.email}</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Hours</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {BAKERY.hours.map((row) => (
              <li key={row.day} className="flex justify-between gap-4">
                <span className="text-muted">{row.day}</span>
                <span className="tabular-nums">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-muted sm:px-6">
          <p>© {new Date().getFullYear()} Gabriel Bakery</p>
          <div className="flex gap-4">
            <Link to="/menu" className="hover:text-fg">
              Menu
            </Link>
            <Link to="/catering" className="hover:text-fg">
              Catering
            </Link>
            <Link to="/about" className="hover:text-fg">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

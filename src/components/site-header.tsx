import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BAKERY } from "@/lib/bakery";
import { cartCount, useHydratedCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/catering", label: "Catering" },
] as const;

function useClientReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 text-fg", className)}
      aria-label={`${BAKERY.name} home`}
    >
      <span className="grid size-9 place-items-center rounded-md bg-primary font-display text-lg font-medium text-primary-fg">
        G
      </span>
      <span className="font-display text-xl leading-none tracking-tight">
        Gabriel
        <span className="hidden text-muted sm:inline"> Bakery</span>
      </span>
    </Link>
  );
}

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  const mounted = useClientReady();
  if (!mounted || isPending) {
    return <div className="size-8 animate-pulse rounded-full bg-secondary" />;
  }
  if (user) return <UserButton />;
  return (
    <Button asChild variant="ghost" size="sm">
      <Link to="/login">Sign in</Link>
    </Button>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { lines } = useHydratedCart();
  const count = cartCount(lines);
  const [open, setOpen] = useState(false);
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-w-xs">
              <SheetHeader>
                <SheetTitle>Gabriel Bakery</SheetTitle>
                <SheetDescription>Neighborhood bread and pastry.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex h-12 items-center rounded-md px-3 text-base",
                      pathname.startsWith(item.to)
                        ? "bg-secondary font-medium"
                        : "text-muted hover:bg-secondary hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center rounded-md px-3 text-base text-muted hover:bg-secondary hover:text-fg"
                >
                  Your orders
                </Link>
                {!isPending && !user && (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center rounded-md px-3 text-base text-muted hover:bg-secondary hover:text-fg"
                  >
                    Sign in
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex h-11 items-center rounded-md px-3 text-sm transition-colors",
                pathname.startsWith(item.to)
                  ? "text-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <AuthSlot />
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart" aria-label={`Cart, ${count} items`}>
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute top-1.5 right-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-fg tabular-nums">
                  {count}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

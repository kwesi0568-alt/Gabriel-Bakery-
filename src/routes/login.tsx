import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        Account
      </p>
      <h1 className="mt-2 font-display text-4xl">Sign in</h1>
      <p className="mt-3 text-muted">
        Rate what you loved and send pickup, bulk, or catering requests.
      </p>
      <div className="mt-8 space-y-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
            >
              Continue with {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
      </div>
      <Link to="/" className="mt-8 text-sm text-muted hover:text-fg">
        Back to the bakery
      </Link>
    </main>
  );
}

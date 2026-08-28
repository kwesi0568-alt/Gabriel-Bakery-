# Gabriel Bakery

A mobile-responsive bakery website for **Gabriel Bakery** — naturally leavened bread, laminated pastry, and cakes from founder **Gabriel Atta** in the United Arab Emirates.

This project was designed and built with **Grok** (Grok Build / xAI): product structure, UI, photography, data model, auth, cart, ratings, catering, and checkout.

---

## 1. Problem statement

Independent bakeries still lose customers between “I want something” and “I placed the order.” A typical shop site is a static menu photo grid. It does not let a guest:

- Learn who bakes the bread and why the shop exists
- Browse a real menu with prices, servings, and allergens
- Select items for later
- Leave a rating after trying a bake
- Ask for a bulk order or catering without a phone tag
- Pay online instead of only at the counter

Gabriel Bakery needed a single site that feels like the shop — warm, editorial, and easy on a phone — and that actually closes the loop from browse → select → schedule → pay.

---

## 2. Solution description

Gabriel Bakery is a full web app, not a brochure:

| Need | What the site does |
| --- | --- |
| Know more about us | Home hero + About (story, values, hours, visit) |
| Browse menu | Categorized case with photography, price, allergens |
| Select items | Cart with quantities, persisted on the device |
| Rate them | Signed-in 1–5 star ratings and comments per item |
| Bulk / catering | Pickup, bulk bake, or catering with date, time, guests, notes |
| Pay | Pay now with card, or pay at pickup; pay later from Your orders |

**Pages:** `/` home, `/about`, `/menu`, `/menu/:slug`, `/cart`, `/catering`, `/orders`, `/login`.

Guests can browse and fill a cart without an account. Sign-in (Google or X) is required to rate, send a request, or pay. Server mutations are always scoped to the signed-in user.

---

## 3. AI approach and architecture

Grok was used as the builder end-to-end: interpret a short product brief, choose stack and information architecture, generate the visual system and photography, implement routes and server functions, then iterate (payments, copy, UAE contact details).

**Architecture**

```text
Browser (React 19 + TanStack Router)
  ├── Pages & UI (Tailwind tokens, Radix, lucide)
  ├── Cart store (Zustand + localStorage)
  └── Server functions (createServerFn)
        ├── Auth middleware → verified user id
        ├── Postgres (Neon in production / PGLite in preview)
        └── Payments (validate card, store last4 only)
```

| Layer | Choice |
| --- | --- |
| UI | React 19, TanStack Start, file-based routes, Tailwind v4 |
| Data | SQL migrations → menu, ratings, orders, payments |
| Auth | Better Auth, Google and X, `authMiddleware` on mutations |
| Cart | Client Zustand; order totals recomputed on the server from menu prices |
| Payments | In-app card checkout; Luhn/expiry/CVC on the server; no PAN/CVC stored |
| Media | Generated bakery photography, served from `public/images/` |

Schema is the source of truth in `migrations/`:

1. `0001_auth.sql` — auth tables
2. `0002_bakery.sql` — menu, ratings, orders
3. `0003_payments.sql` — payment method, status, and payment records

---

## 4. Selected theme

**Warm atelier bakery** — cream paper, terracotta glaze, and forest-green accent. The look is a neighborhood shop at opening hour, not a neon food-delivery brand.

| Token | Role | Value |
| --- | --- | --- |
| Background | Flour-dusted paper | `#F3EBE0` |
| Surface / card | Linen case | `#FBF6EE` / `#FFF9F2` |
| Foreground | Dark crust | `#2A1C14` |
| Muted | Cocoa copy | `#6E5748` |
| Primary | Terracotta / kiln | `#9A3C1E` |
| Accent | Herb / olive | `#3F4A3C` |
| Display type | Headlines | **Fraunces** (serif) |
| Body type | UI and copy | **Source Sans 3** |
| Radius | Soft, not pill-like | `0.75rem` |
| Imagery | Editorial food photos | Warm light, wood, linen, no neon |

Motion stays small (hover, sheet, toast). Layout is mobile-first: stacked hero, two-column menu on small screens, cart and payment fields that stay usable at ~390px.

---

## 5. How Grok was used

Grok (Grok Build) produced the running product from a one-line brief and follow-up edits.

1. **Product from a short prompt** — “bakery site, about, menu, select, rate, bulk/catering, call it Gabriel Bakery, mobile responsive.” Grok expanded that into pages, copy, data model, and flows.
2. **Visual system** — palette, type pairing, spacing, and component language consistent with a craft bakery rather than a generic template.
3. **Photography** — hero, about, OG share card, and menu item photos generated to match the terracotta/cream theme, then placed in `public/images/`.
4. **Implementation** — routes, server functions, Postgres schema, auth gates, cart, ratings, catering packages, and checkout.
5. **Iteration in place**
   - Online payment (pay now vs pay at pickup, last-four only, pay later on orders)
   - Copy and contact: founder **Gabriel Atta**, location **United Arab Emirates**, phone **+971 543 191697**, email **gatta9707@gmail.com**
6. **Quality pass** — typecheck, mobile layout, hydration-safe auth/cart UI, and production-oriented migrations.

Grok was not used as a chatbot bolted onto the bakery. It was the architect, designer, and engineer of the site.

---

## Features (reference)

- Home with hero, featured bakes, and shop story
- About with values, hours, and visit details
- Menu by category with item detail pages
- Star ratings and comments (signed in)
- Cart with local persistence
- Pickup, bulk, and catering scheduling
- Pay now or pay at pickup
- Catering trays that add a set of items to the cart
- Google / X sign-in
- Mobile-responsive layout

## Getting started

Requires **Node.js 22**.

```bash
npm install
npm run dev
```

The app serves at [http://localhost:8080](http://localhost:8080).

```bash
npm run typecheck   # TypeScript
npm run build       # production build + migrations
npm run preview     # serve the built app
```

## Auth, data, and payments

Sign-in is required to rate, send a request, or pay. Browse and cart work without an account.

Without `DATABASE_URL`, the app uses in-memory PGLite. With `DATABASE_URL`, it uses Neon. `npm run build` runs migrations so production has the schema.

Online charges are validated on the server. Full card numbers and CVC are never stored.

Test charge: `4242 4242 4242 4242`, any future expiry, any 3-digit CVC. Decline test: `4000 0000 0000 0002`. This is a demo processor, not a live Stripe charge.

## Shop details

Configured in `src/lib/bakery.ts`:

| | |
| --- | --- |
| Founder | Gabriel Atta |
| Location | United Arab Emirates |
| Phone | +971 543 191697 |
| Email | gatta9707@gmail.com |
| Hours | Tue–Fri 7:00–5:00 · Sat 8:00–5:00 · Sun 8:00–2:00 · Mon closed |

## Project layout

```text
migrations/            SQL schema
public/images/         Menu, hero, about photography
src/routes/            Pages
src/components/        Shell, forms, UI
src/lib/bakery.ts      Shop copy and types
src/lib/cart-store.ts  Cart
src/lib/payment.ts     Card checks
src/lib/server/        Menu, ratings, orders, payments
src/lib/auth/          Sign-in
src/styles.css         Theme tokens
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 8080 |
| `npm run build` | Production build + migrate |
| `npm run db:migrate` | Apply `migrations/*.sql` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run preview` | Serve the production build |

## License

Private bakery project. Contact [gatta9707@gmail.com](mailto:gatta9707@gmail.com).

import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as BAKERY, r as Button } from "./router-DFpfT4HY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BVa2C7Ie.js
var import_jsx_runtime = require_jsx_runtime();
var VALUES = [
	{
		title: "Flour",
		body: "We mill a portion of our wheat in-house and buy the rest from two farms we visit every harvest. Flavor starts there, not in a mix."
	},
	{
		title: "Time",
		body: "Sourdough ferments overnight. Croissants laminate over two days. Nothing here is rushed to fill a case."
	},
	{
		title: "Fire",
		body: "Bread on the stone, pastry in a deck oven. Heat is a craft, and we still watch the bake instead of a timer alone."
	}
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
					children: "About us"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl sm:text-5xl",
					children: "Named for the baker who still opens the shop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-lg text-muted",
					children: "Gabriel Bakery is a small shop on Lark Street. We bake bread, pastry, and a few cakes — enough to feed the block, and the occasional wedding down the hill."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-12 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/about.jpg",
					alt: "Gabriel scoring dough at the bench",
					className: "aspect-4/3 w-full object-cover md:aspect-21/9"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl space-y-5 px-4 pb-16 text-base leading-relaxed text-fg/90 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Gabriel Moreau learned to bake in his uncle’s kitchen outside Lyon, then spent a decade in hotel pastry before deciding he wanted a door he could unlock himself. In ",
					BAKERY.founded,
					" he found a narrow storefront with a broken oven and a good landlord. The first loaf came out of that oven the same week."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The shop has grown only as much as the neighborhood asked it to. We added laminated pastry when people started lining up for the leftover croissant. Cakes arrived later, for the birthdays we were already invited to. Catering followed because offices on Vine Street kept calling for “whatever you have, times thirty.”" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We are still a bakery first. If you come in the morning you’ll smell the mill. If you come at noon there may be nothing left but rye and a single kouign-amann. That’s by design." })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3",
				children: VALUES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-6 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: value.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: value.body
					})]
				}, value.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Visit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-muted",
					children: [
						BAKERY.address,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						BAKERY.city
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm",
					children: [
						BAKERY.phone,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						BAKERY.email
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						children: "See what’s in the case"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3 rounded-xl bg-card p-6 shadow-[var(--shadow-border)]",
				children: BAKERY.hours.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between gap-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: row.day
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: row.time
					})]
				}, row.day))
			})]
		})
	] });
}
//#endregion
export { About as component };

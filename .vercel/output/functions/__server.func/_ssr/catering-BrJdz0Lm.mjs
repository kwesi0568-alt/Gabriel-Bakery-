import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useCart, d as formatPrice, o as useHydratedCart, r as Button } from "./router-DFpfT4HY.mjs";
import { i as listMenuItems } from "./bakery-ID5ii5ZL.mjs";
import { t as OrderForm } from "./order-form-DDBAhVPY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catering-BrJdz0Lm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PACKAGES = [
	{
		title: "Morning tray",
		detail: "A mix of croissants, morning buns, and danishes. Coffee not included — we bake, we don’t brew for events.",
		serves: "12 guests",
		add: [
			{
				slug: "butter-croissant",
				qty: 6
			},
			{
				slug: "morning-bun",
				qty: 6
			},
			{
				slug: "almond-croissant",
				qty: 4
			}
		]
	},
	{
		title: "Bread board",
		detail: "Sourdough, rye, and focaccia with enough crust for a long lunch table.",
		serves: "16 guests",
		add: [
			{
				slug: "country-sourdough",
				qty: 2
			},
			{
				slug: "seeded-rye",
				qty: 1
			},
			{
				slug: "olive-focaccia",
				qty: 1
			}
		]
	},
	{
		title: "Dessert table",
		detail: "One whole cake and a tart, plus kouign-amann for the people who want something they can hold.",
		serves: "20 guests",
		add: [
			{
				slug: "olive-oil-citrus-cake",
				qty: 1
			},
			{
				slug: "seasonal-fruit-tart",
				qty: 1
			},
			{
				slug: "kouign-amann",
				qty: 12
			}
		]
	}
];
function CateringPage() {
	const [items, setItems] = (0, import_react.useState)([]);
	const add = useCart((s) => s.add);
	const { lines } = useHydratedCart();
	(0, import_react.useEffect)(() => {
		listMenuItems().then(setItems).catch(() => setItems([]));
	}, []);
	function addPackage(slugs) {
		for (const entry of slugs) {
			const item = items.find((row) => row.slug === entry.slug);
			if (!item) continue;
			add({
				itemId: item.id,
				slug: item.slug,
				name: item.name,
				priceCents: item.priceCents,
				imagePath: item.imagePath
			}, entry.qty);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: "Events & offices"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 max-w-2xl font-display text-4xl sm:text-5xl",
				children: "Bulk orders and catering"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted",
				children: "Two days’ notice for a bulk bake. A week is kinder for full catering. Start with a package or build from the menu, then send the date."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-12 grid gap-5 md:grid-cols-3",
				children: PACKAGES.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: pack.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs font-medium tracking-wide text-primary uppercase",
							children: pack.serves
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-sm text-muted",
							children: pack.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-5",
							disabled: items.length === 0,
							onClick: () => addPackage(pack.add),
							children: "Add this mix"
						})
					]
				}, pack.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 grid gap-10 lg:grid-cols-[1fr_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Send the request"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Add a package above or",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/menu",
								className: "font-medium text-primary",
								children: "choose from the menu"
							}),
							"."
						] }) : `${lines.length} item${lines.length === 1 ? "" : "s"} in your selection.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderForm, { defaultKind: "catering" })
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-xl bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.16em] text-muted uppercase",
							children: "In this request"
						}),
						lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Nothing selected yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									line.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted tabular-nums",
										children: ["×", line.qty]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: formatPrice(line.priceCents * line.qty)
								})]
							}, line.itemId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: "mt-4 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cart",
								children: "Edit selection"
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { CateringPage as component };

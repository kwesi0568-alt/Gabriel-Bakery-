import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as Plus, r as Trash2, s as Minus } from "../_libs/lucide-react.mjs";
import { a as useCart, d as formatPrice, i as cartTotal, o as useHydratedCart, r as Button } from "./router-DFpfT4HY.mjs";
import { t as OrderForm } from "./order-form-DDBAhVPY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-9YyUF40u.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { lines, hydrated } = useHydratedCart();
	const setQty = useCart((s) => s.setQty);
	const remove = useCart((s) => s.remove);
	const total = cartTotal(lines);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: "Your selection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl sm:text-5xl",
				children: "Cart"
			}),
			!hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-10 h-32 max-w-xl animate-pulse rounded-xl bg-secondary" }) : lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 max-w-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "Nothing selected yet. Browse the case and add what you want for pickup or a larger order."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						children: "Browse the menu"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-4 rounded-xl bg-card p-3 shadow-[var(--shadow-border)] sm:p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: line.imagePath,
							alt: "",
							className: "size-20 shrink-0 rounded-md object-cover sm:size-24"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/menu/$slug",
										params: { slug: line.slug },
										className: "font-display text-xl leading-snug hover:text-primary",
										children: line.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "shrink-0 font-medium tabular-nums",
										children: formatPrice(line.priceCents * line.qty)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 text-sm text-muted tabular-nums",
									children: [formatPrice(line.priceCents), " each"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center rounded-md bg-surface shadow-[var(--shadow-border)]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "grid size-11 place-items-center",
												"aria-label": `Decrease ${line.name}`,
												onClick: () => setQty(line.itemId, line.qty - 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "min-w-8 text-center tabular-nums",
												children: line.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "grid size-11 place-items-center",
												"aria-label": `Increase ${line.name}`,
												onClick: () => setQty(line.itemId, line.qty + 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-11 place-items-center rounded-md text-muted hover:bg-secondary hover:text-fg",
										"aria-label": `Remove ${line.name}`,
										onClick: () => remove(line.itemId),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								})
							]
						})]
					}, line.itemId))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-xl bg-card p-5 shadow-[var(--shadow-border)] lg:sticky lg:top-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Estimated total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: formatPrice(total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Tax is settled at pickup. Bulk and catering are confirmed by the bakery."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "mt-5 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/menu",
								children: "Add more"
							})
						})
					]
				})]
			}),
			lines.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Schedule pickup or a larger bake"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Shop pickup needs a day’s notice. Bulk and catering need two days or more."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderForm, { defaultKind: "pickup" })
					})
				]
			})
		]
	});
}
//#endregion
export { CartPage as component };

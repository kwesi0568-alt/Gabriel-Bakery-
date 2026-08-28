import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { d as formatPrice, f as useCurrentUserState, r as Button, s as RedirectToSignIn, u as cn } from "./router-DFpfT4HY.mjs";
import { a as listMyOrders } from "./bakery-ID5ii5ZL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-CrpFq6iS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-secondary text-fg",
		primary: "bg-primary/10 text-primary"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var KIND_LABEL = {
	pickup: "Pickup",
	bulk: "Bulk bake",
	catering: "Catering"
};
function OrdersPage() {
	const { user, isPending } = useCurrentUserState();
	const [orders, setOrders] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		listMyOrders().then(setOrders).catch(() => setOrders([]));
	}, [user]);
	if (!ready || isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto w-full max-w-3xl flex-1 px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-xl bg-secondary" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: "Account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "Your orders"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Requests you’ve sent to the bakery."
			}),
			orders === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-32 animate-pulse rounded-xl bg-secondary" }) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "No requests yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						children: "Start from the menu"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 space-y-4",
				children: orders.map((order) => {
					const total = order.items.reduce((sum, item) => sum + item.quantity * item.unitPriceCents, 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-card p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl",
									children: [
										KIND_LABEL[order.kind] ?? order.kind,
										" #",
										order.id
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										order.eventDate,
										order.eventTime ? ` · ${order.eventTime}` : "",
										order.guestCount ? ` · ${order.guestCount} guests` : ""
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "primary",
									children: order.status
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-1 text-sm",
								children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										item.name,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted tabular-nums",
											children: ["×", item.quantity]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: formatPrice(item.unitPriceCents * item.quantity)
									})]
								}, item.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-medium tabular-nums",
								children: formatPrice(total)
							}),
							order.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: order.notes
							})
						]
					}, order.id);
				})
			})
		]
	});
}
//#endregion
export { OrdersPage as component };

import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useCart, d as formatPrice, f as useCurrentUserState, i as cartTotal, o as useHydratedCart, r as Button, u as cn } from "./router-DFpfT4HY.mjs";
import { t as createOrder } from "./bakery-ID5ii5ZL.mjs";
import { t as Textarea } from "./textarea-CR673O9U.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-form-DDBAhVPY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-card px-3 text-base text-fg shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium text-fg", className),
	...props
}));
Label.displayName = Root.displayName;
var KINDS = [
	{
		id: "pickup",
		label: "Shop pickup",
		hint: "Ready at the counter"
	},
	{
		id: "bulk",
		label: "Bulk bake",
		hint: "Dozens for the office or table"
	},
	{
		id: "catering",
		label: "Catering",
		hint: "Events, trays, and service"
	}
];
function OrderForm({ defaultKind = "pickup" }) {
	const { user, isPending } = useCurrentUserState();
	const { lines } = useHydratedCart();
	const clear = useCart((s) => s.clear);
	const [kind, setKind] = (0, import_react.useState)(defaultKind);
	const [eventDate, setEventDate] = (0, import_react.useState)("");
	const [eventTime, setEventTime] = (0, import_react.useState)(defaultKind === "pickup" ? "09:00" : "10:00");
	const [guestCount, setGuestCount] = (0, import_react.useState)(defaultKind === "catering" ? "24" : "1");
	const [contactName, setContactName] = (0, import_react.useState)("");
	const [contactPhone, setContactPhone] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [doneId, setDoneId] = (0, import_react.useState)(null);
	const [minDate, setMinDate] = (0, import_react.useState)("");
	const [authReady, setAuthReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setAuthReady(true), []);
	(0, import_react.useEffect)(() => {
		const next = /* @__PURE__ */ new Date();
		next.setDate(next.getDate() + 1);
		setMinDate(next.toISOString().slice(0, 10));
	}, []);
	const total = cartTotal(lines);
	const showAuthSkeleton = !authReady || isPending;
	if (doneId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card p-6 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.16em] text-primary uppercase",
				children: "Request received"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl",
				children: "We’ll be in touch"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-md text-muted",
				children: [
					"Order #",
					doneId,
					" is with the bakery. We confirm bulk and catering requests by phone the same business day."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/orders",
					children: "View your orders"
				})
			})
		]
	});
	async function onSubmit(e) {
		e.preventDefault();
		if (!user) return;
		if (lines.length === 0) {
			toast.error("Add something from the menu first.");
			return;
		}
		setSubmitting(true);
		try {
			const result = await createOrder({ data: {
				kind,
				eventDate,
				eventTime,
				guestCount: kind === "pickup" ? void 0 : Math.max(1, Number(guestCount) || 1),
				contactName,
				contactPhone,
				notes: notes.trim() || void 0,
				lines: lines.map((line) => ({
					itemId: line.itemId,
					quantity: line.qty
				}))
			} });
			clear();
			setDoneId(result.id);
			toast.success("Request sent to the bakery");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not send the request.";
			if (message === "Unauthorized") toast.error("Sign in to schedule an order.");
			else toast.error(message);
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "grid gap-2 sm:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "sr-only",
					children: "Order type"
				}), KINDS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: `flex min-h-20 cursor-pointer flex-col justify-center rounded-lg px-4 py-3 shadow-[var(--shadow-border)] transition-[box-shadow,background-color] ${kind === option.id ? "bg-secondary" : "bg-card hover:bg-surface"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "kind",
							value: option.id,
							checked: kind === option.id,
							onChange: () => setKind(option.id),
							className: "sr-only"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: option.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: option.hint
						})
					]
				}, option.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "event-date",
							children: kind === "pickup" ? "Pickup date" : "Event date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "event-date",
							type: "date",
							required: true,
							min: minDate || void 0,
							value: eventDate,
							onChange: (e) => setEventDate(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "event-time",
							children: kind === "pickup" ? "Pickup time" : "Start time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "event-time",
							type: "time",
							required: true,
							value: eventTime,
							onChange: (e) => setEventTime(e.target.value)
						})]
					}),
					kind !== "pickup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "guests",
							children: "Guest count"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "guests",
							type: "number",
							min: 1,
							max: 500,
							required: true,
							value: guestCount,
							onChange: (e) => setGuestCount(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "contact-name",
							children: "Your name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "contact-name",
							required: true,
							autoComplete: "name",
							value: contactName,
							onChange: (e) => setContactName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "contact-phone",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "contact-phone",
							type: "tel",
							required: true,
							autoComplete: "tel",
							placeholder: "We’ll confirm on this number",
							value: contactPhone,
							onChange: (e) => setContactPhone(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							placeholder: "Allergies, delivery notes, or a short event brief",
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Estimated total",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-fg tabular-nums",
							children: formatPrice(total)
						}),
						kind !== "pickup" ? " · confirmed after we speak" : ""
					]
				}), showAuthSkeleton ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-40 animate-pulse rounded-md bg-secondary" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: submitting || lines.length === 0,
					children: submitting ? "Sending…" : "Send request"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Sign in to send"
					})
				})]
			})
		]
	});
}
//#endregion
export { OrderForm as t };

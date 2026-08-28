import { o as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { o as Plus, s as Minus } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as useCart, d as formatPrice, f as useCurrentUserState, n as Route$1, r as Button } from "./_ssr/router-DFpfT4HY.mjs";
import { n as getMenuItem, o as listRatings, r as getMyRating, s as upsertRating } from "./_ssr/bakery-ID5ii5ZL.mjs";
import { t as Textarea } from "./_ssr/textarea-CR673O9U.mjs";
import { n as StarRow, t as StarPicker } from "./_ssr/stars-CI3XGkiX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-yQaMmljc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ItemPage() {
	const { slug } = Route$1.useParams();
	const [item, setItem] = (0, import_react.useState)(void 0);
	const [ratings, setRatings] = (0, import_react.useState)([]);
	const [mine, setMine] = (0, import_react.useState)(null);
	const [qty, setQty] = (0, import_react.useState)(1);
	const add = useCart((s) => s.add);
	const { user, isPending } = useCurrentUserState();
	const [authReady, setAuthReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setAuthReady(true), []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setItem(void 0);
		getMenuItem({ data: slug }).then((found) => {
			if (cancelled) return;
			setItem(found);
			if (found) listRatings({ data: found.id }).then((rows) => {
				if (!cancelled) setRatings(rows);
			}).catch(() => {
				if (!cancelled) setRatings([]);
			});
		}).catch(() => {
			if (!cancelled) setItem(null);
		});
		return () => {
			cancelled = true;
		};
	}, [slug]);
	(0, import_react.useEffect)(() => {
		if (!item || !user) {
			setMine(null);
			return;
		}
		getMyRating({ data: item.id }).then(setMine).catch(() => setMine(null));
	}, [item, user]);
	if (item === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto w-full max-w-6xl flex-1 px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-4/3 max-w-xl animate-pulse rounded-xl bg-secondary" })
	});
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl flex-1 px-4 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "That item isn’t on the board"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				children: "Back to the menu"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						className: "hover:text-fg",
						children: "Menu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-2",
						children: "/"
					}),
					item.category
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.imagePath,
						alt: item.name,
						className: "aspect-4/3 w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl sm:text-5xl",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-2xl tabular-nums",
						children: formatPrice(item.priceCents)
					}),
					item.ratingCount > 0 && item.avgStars !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRow, {
							value: item.avgStars,
							size: "md"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								item.avgStars.toFixed(1),
								" from ",
								item.ratingCount,
								" ",
								item.ratingCount === 1 ? "rating" : "ratings"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted",
						children: item.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 grid grid-cols-2 gap-4 text-sm",
						children: [item.serves && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Serves"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5",
							children: item.serves
						})] }), item.allergens && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Contains"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5",
							children: item.allergens
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center rounded-md bg-card shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center",
									"aria-label": "Decrease quantity",
									onClick: () => setQty((n) => Math.max(1, n - 1)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-8 text-center tabular-nums",
									children: qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center",
									"aria-label": "Increase quantity",
									onClick: () => setQty((n) => Math.min(200, n + 1)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								add({
									itemId: item.id,
									slug: item.slug,
									name: item.name,
									priceCents: item.priceCents,
									imagePath: item.imagePath
								}, qty);
								toast.success(`${item.name} added`);
							},
							children: "Add to order"
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Rate this bake"
					}),
					!authReady || isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-24 animate-pulse rounded-xl bg-secondary" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingForm, {
						itemId: item.id,
						initial: mine,
						onSaved: async () => {
							const [freshItem, rows, my] = await Promise.all([
								getMenuItem({ data: slug }),
								listRatings({ data: item.id }),
								getMyRating({ data: item.id })
							]);
							if (freshItem) setItem(freshItem);
							setRatings(rows);
							setMine(my);
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "font-medium text-primary",
								children: "Sign in"
							}),
							" ",
							"to leave a rating."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 space-y-4",
						children: ratings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "No ratings yet. Be the first."
						}) : ratings.map((rating) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg bg-card px-4 py-3 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRow, { value: rating.stars }), rating.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: rating.comment
							})]
						}, rating.id))
					})
				]
			})
		]
	});
}
function RatingForm({ itemId, initial, onSaved }) {
	const [stars, setStars] = (0, import_react.useState)(initial?.stars ?? 0);
	const [comment, setComment] = (0, import_react.useState)(initial?.comment ?? "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setStars(initial?.stars ?? 0);
		setComment(initial?.comment ?? "");
	}, [initial]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 space-y-3",
		onSubmit: async (e) => {
			e.preventDefault();
			if (stars < 1) {
				toast.error("Choose a star rating.");
				return;
			}
			setSaving(true);
			try {
				await upsertRating({ data: {
					itemId,
					stars,
					comment: comment.trim() || void 0
				} });
				toast.success("Rating saved");
				await onSaved();
			} catch (err) {
				const message = err instanceof Error ? err.message : "Could not save.";
				toast.error(message === "Unauthorized" ? "Sign in to rate." : message);
			} finally {
				setSaving(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarPicker, {
				value: stars,
				onChange: setStars,
				disabled: saving
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: comment,
				onChange: (e) => setComment(e.target.value),
				placeholder: "What should we keep doing?",
				maxLength: 400
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: saving,
				children: saving ? "Saving…" : initial ? "Update rating" : "Submit rating"
			})
		]
	});
}
//#endregion
export { ItemPage as component };

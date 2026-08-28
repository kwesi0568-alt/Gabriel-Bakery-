import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as BAKERY, r as Button } from "./router-DFpfT4HY.mjs";
import { i as listMenuItems } from "./bakery-ID5ii5ZL.mjs";
import { t as MenuCard } from "./menu-card-BWojYGZM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-OSa8DWD3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const [featured, setFeatured] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		listMenuItems().then((items) => setFeatured(items.filter((item) => item.featured).slice(0, 4))).catch(() => setFeatured([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative min-h-[78dvh] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero.jpg",
					alt: "The bakery counter at opening hour",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-fg/75 via-fg/25 to-fg/15" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6 sm:pb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium tracking-[0.2em] text-primary-fg/80 uppercase",
							children: ["Harbor & Vine · since ", BAKERY.founded]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-xl font-display text-5xl font-medium text-primary-fg sm:text-6xl md:text-7xl",
							children: "Baked before dawn"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-base text-primary-fg/85 sm:text-lg",
							children: "Naturally leavened bread, laminated pastry, and cakes for the table. Come early — we sell out."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/menu",
									children: ["Browse the menu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "border-0 bg-primary-fg/12 text-primary-fg shadow-none hover:bg-primary-fg/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/catering",
									children: "Plan catering"
								})
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
					children: "From the case"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl sm:text-4xl",
					children: "What we bake today"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					className: "inline-flex h-11 items-center text-sm font-medium text-primary",
					children: ["Full menu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: featured === null ? Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-4/3 animate-pulse rounded-xl bg-secondary" }, i)) : featured.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuCard, { item }, item.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/about.jpg",
						alt: "Gabriel scoring a country sourdough loaf",
						className: "aspect-4/3 w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
						children: "The shop"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl sm:text-4xl",
						children: "A neighborhood bakery, not a brand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted",
						children: "Gabriel Moreau opened the doors in 2014 with one stone mill and a stubborn belief that bread should take the time it takes. We still mix at night, bake before dawn, and know the people who come back for the heel of the rye."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							children: "Our story"
						})
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-6 shadow-[var(--shadow-border)] sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
					children: "Hours"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-3",
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-primary p-6 text-primary-fg sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] uppercase opacity-80",
						children: "Tables & offices"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl",
						children: "Need a tray, or fifty loaves?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-primary-fg/85",
						children: "Two days’ notice for bulk bakes. A week for full catering. We’ll help you choose the right mix."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6 bg-primary-fg text-fg hover:bg-primary-fg/90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/catering",
							children: "Schedule an order"
						})
					})
				]
			})]
		})
	] });
}
//#endregion
export { Home as component };

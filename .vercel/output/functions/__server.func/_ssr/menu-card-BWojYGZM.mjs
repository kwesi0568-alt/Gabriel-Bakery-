import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useCart, d as formatPrice } from "./router-DFpfT4HY.mjs";
import { n as StarRow } from "./stars-CI3XGkiX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-card-BWojYGZM.js
var import_jsx_runtime = require_jsx_runtime();
function MenuCard({ item }) {
	const add = useCart((s) => s.add);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/menu/$slug",
			params: { slug: item.slug },
			className: "block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-4/3 overflow-hidden bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.imagePath,
					alt: item.name,
					className: "size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/menu/$slug",
					params: { slug: item.slug },
					className: "font-display text-xl font-medium leading-snug text-fg hover:text-primary",
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted",
					children: item.description
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shrink-0 font-medium tabular-nums",
					children: formatPrice(item.priceCents)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex items-center justify-between gap-3",
				children: [item.ratingCount > 0 && item.avgStars !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRow, { value: item.avgStars }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [
							item.avgStars.toFixed(1),
							" · ",
							item.ratingCount
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "Not rated yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						add({
							itemId: item.id,
							slug: item.slug,
							name: item.name,
							priceCents: item.priceCents,
							imagePath: item.imagePath
						});
						toast.success(`${item.name} added`);
					},
					className: "inline-flex h-11 items-center gap-1.5 rounded-md bg-primary px-3.5 text-sm font-medium text-primary-fg transition-[background-color,transform] duration-150 hover:bg-primary/92 active:scale-[0.96]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add"]
				})]
			})]
		})]
	});
}
//#endregion
export { MenuCard as t };

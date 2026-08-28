import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as CATEGORIES, u as cn } from "./router-DFpfT4HY.mjs";
import { i as listMenuItems } from "./bakery-ID5ii5ZL.mjs";
import { t as MenuCard } from "./menu-card-BWojYGZM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-oB18FSXv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MenuPage() {
	const [items, setItems] = (0, import_react.useState)(null);
	const [category, setCategory] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		listMenuItems().then(setItems).catch(() => setItems([]));
	}, []);
	const visible = (0, import_react.useMemo)(() => {
		if (!items) return [];
		if (category === "all") return items;
		return items.filter((item) => item.category === category);
	}, [items, category]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: "The case"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl sm:text-5xl",
				children: "Menu"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: "Add what you want, then schedule pickup or a larger bake. Availability is best in the morning."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex gap-2 overflow-x-auto pb-1",
				children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setCategory(cat.id),
					className: cn("h-11 shrink-0 rounded-full px-4 text-sm transition-colors", category === cat.id ? "bg-primary text-primary-fg" : "bg-card text-muted shadow-[var(--shadow-border)] hover:text-fg"),
					children: cat.label
				}, cat.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: items === null ? Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-4/3 animate-pulse rounded-xl bg-secondary" }, i)) : visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuCard, { item }, item.id))
			})
		]
	});
}
//#endregion
export { MenuPage as component };

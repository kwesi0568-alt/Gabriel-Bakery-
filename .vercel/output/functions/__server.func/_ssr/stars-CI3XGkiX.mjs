import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Star } from "../_libs/lucide-react.mjs";
import { u as cn } from "./router-DFpfT4HY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stars-CI3XGkiX.js
var import_jsx_runtime = require_jsx_runtime();
function StarRow({ value, size = "sm", className }) {
	const icon = size === "md" ? "size-5" : "size-3.5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-0.5", className),
		"aria-hidden": true,
		children: Array.from({ length: 5 }, (_, i) => {
			const filled = value >= i + 1;
			const half = !filled && value >= i + .5;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn(icon, filled || half ? "fill-primary text-primary" : "text-border") }, i);
		})
	});
}
function StarPicker({ value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-1",
		role: "radiogroup",
		"aria-label": "Rating",
		children: Array.from({ length: 5 }, (_, i) => {
			const stars = i + 1;
			const selected = value >= stars;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "radio",
				"aria-checked": value === stars,
				"aria-label": `${stars} star${stars === 1 ? "" : "s"}`,
				disabled,
				onClick: () => onChange(stars),
				className: "grid size-11 place-items-center rounded-md transition-colors hover:bg-secondary disabled:opacity-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-6", selected ? "fill-primary text-primary" : "text-border") })
			}, stars);
		})
	});
}
//#endregion
export { StarRow as n, StarPicker as t };

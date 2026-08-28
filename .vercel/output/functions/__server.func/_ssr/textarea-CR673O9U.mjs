import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as cn } from "./router-DFpfT4HY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-CR673O9U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-28 w-full rounded-lg bg-card px-3 py-2.5 text-base text-fg shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
export { Textarea as t };

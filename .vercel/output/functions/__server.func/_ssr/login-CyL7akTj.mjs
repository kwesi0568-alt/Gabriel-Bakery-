import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as signIn } from "./client-sGid3STf.mjs";
import { t as GROK_PROVIDERS } from "./server-B3wDwoYW.mjs";
import { r as Button } from "./router-DFpfT4HY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CyL7akTj.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: "Account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "Sign in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Rate what you loved and send pickup, bulk, or catering requests."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-3",
				children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "w-full",
					onClick: () => signIn(p.providerId, { callbackURL: "/" }),
					children: ["Continue with ", p.label]
				}, p.providerId))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-8 text-sm text-muted hover:text-fg",
				children: "Back to the bakery"
			})
		]
	});
}
//#endregion
export { Login as component };

import { i as createServerFn, o as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-CW6-8zqs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bakery-ID5ii5ZL.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listMenuItems = createServerFn({ method: "GET" }).handler(createSsrRpc("47bcfe8e81a325669817798d120f7e5c1dcb78c8eafff198ea6ded00c9c769b5"));
var getMenuItem = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("acb79a0707ae1ccb42406c937387f4bf65b7b92f234454b6cac8dfb08440fa0a"));
var listRatings = createServerFn({ method: "GET" }).validator((itemId) => itemId).handler(createSsrRpc("215191a8922f4a0d6dee64c89f95606382138d400821931c1f11eaee678a0188"));
var getMyRating = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((itemId) => itemId).handler(createSsrRpc("99b30eca21e075a903c7250ea15327c71c764cfc85a7fedd859f17fab1ece634"));
var ratingSchema = object({
	itemId: number().int().positive(),
	stars: number().int().min(1).max(5),
	comment: string().max(400).optional()
});
var upsertRating = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ratingSchema.parse(input)).handler(createSsrRpc("22b4990971cf1283388200da678c848b9ced72b6c51d9836beb81f6013bb3ad7"));
var orderLineSchema = object({
	itemId: number().int().positive(),
	quantity: number().int().min(1).max(200)
});
var orderSchema = object({
	kind: _enum([
		"pickup",
		"bulk",
		"catering"
	]),
	eventDate: string().min(1),
	eventTime: string().min(1),
	guestCount: number().int().min(1).max(500).optional(),
	contactName: string().trim().min(1).max(80),
	contactPhone: string().trim().min(7).max(40),
	notes: string().max(800).optional(),
	lines: array(orderLineSchema).min(1)
});
var createOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => orderSchema.parse(input)).handler(createSsrRpc("464c08bf6529aade1216c8092bcae323f11c6a8e3654c068a92a83a31ff022a4"));
var listMyOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d6e0888a4c078c403b1e9aaf6ab8f3606b8e2b13af317c915f7be62e3efb710e"));
//#endregion
export { listMyOrders as a, listMenuItems as i, getMenuItem as n, listRatings as o, getMyRating as r, upsertRating as s, createOrder as t };

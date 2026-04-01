import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const routerOptions = {
	routeTree,
	scrollRestoration: true,
};

export function getRouter(): ReturnType<typeof createRouter> {
	return createRouter(routerOptions);
}

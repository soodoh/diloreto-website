/// <reference types="vite/client" />

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import type { JSX, ReactNode } from "react";
import Header from "~/components/header";
import NotFound from "~/components/not-found";
import appCss from "~/styles/app.css?url";

export function RootDocument({
	children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<Header isHome={pathname === "/"} />
				{children}
				<Scripts />
			</body>
		</html>
	);
}

export function RootComponent(): JSX.Element {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				name: "google-site-verification",
				content: "ZwC1ZTsoP45swAD5qd6Lw_jOVbNOh-2jz8Jki5Jh6A8",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.png" },
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFound,
});

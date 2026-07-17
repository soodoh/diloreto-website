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
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital@0;1&family=Karla&display=swap",
			},
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/png", sizes: "64x64", href: "/favicon.png" },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFound,
});

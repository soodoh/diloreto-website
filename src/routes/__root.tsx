/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import appCss from "~/styles/app.css?url";
import Header from "~/components/header";

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

export function NotFound(): JSX.Element {
  return (
    <div className="p-4">
      <h3 className="font-serif text-3xl mb-4">404: Page Not Found</h3>
      <p className="font-serif text-xl">Please check your URL</p>
    </div>
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

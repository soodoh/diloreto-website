/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import appCss from '~/styles/app.css?url'
import Header from '~/components/Header'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'ZwC1ZTsoP45swAD5qd6Lw_jOVbNOh-2jz8Jki5Jh6A8' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.png' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function NotFound() {
  return (
    <div className="p-4">
      <h3 className="font-serif text-3xl mb-4">404: Page Not Found</h3>
      <p className="font-serif text-xl">Please check your URL</p>
    </div>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = useRouterState({ select: s => s.location.pathname })

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header isHome={pathname === '/'} />
        {children}
        <Scripts />
      </body>
    </html>
  )
}

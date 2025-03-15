import { HeaderNav } from "@/components/navigation/HeaderNav"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Ваш гид",
    template: "%s | Гид",
  },
  description: "A Next.js site powered by a Drupal backend.",
  icons: {
    icon: "/favicon.ico",
  },
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-screen-md px-6 mx-auto">
          <HeaderNav />
          <main className="container py-10 mx-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}

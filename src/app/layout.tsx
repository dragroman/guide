// src/app/layout.tsx
import type { Viewport } from "next"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import localFont from "next/font/local"
import { GoogleTagManager } from "@next/third-parties/google"
import "@shared/styles/globals.css"
import { Providers } from "@features/auth/session"
import { Toaster } from "@shared/ui/sonner"
import { NextIntlClientProvider } from "next-intl"

const merriweather = localFont({
  src: [
    {
      path: "../shared/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../shared/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../shared/fonts/Inter-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-merriweather",
})
export const metadata: Metadata = {
  title: {
    default: "Индивидуальный тур в Китай",
    template: "%s | chinq.ru",
  },
  description: "A Next.js site powered by a Drupal backend.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export default async function RootLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <html
      lang="ru"
      // className={`${merriweather.className} antialiased scroll-smooth`}
    >
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body>
        <Providers>
          <NextIntlClientProvider>
            {modal}
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

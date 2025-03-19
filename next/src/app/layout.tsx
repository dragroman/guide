// src/app/layout.tsx
import type { Viewport } from "next"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import localFont from "next/font/local"

import "@/styles/globals.css"

const merriweather = localFont({
  src: [
    {
      path: "../fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Inter-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-merriweather",
})
export const metadata: Metadata = {
  title: {
    default: "Туры в Китай",
    template: "%s | Туры в Китай",
  },
  description: "Путеводитель по Китаю от глазами экспертов",
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${merriweather.className} antialiased scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  )
}

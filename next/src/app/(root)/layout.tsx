// src/app/(root)/layout.tsx
import { Footer } from "@/components/navigation/Footer"
import { Header } from "@/components/navigation/Header"
import type { ReactNode } from "react"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  )
}

// src/app/(root)/layout.tsx
import { Footer } from "@/components/navigation/Footer"
import { Header } from "@/components/navigation/Header"
import type { ReactNode } from "react"

export default function NodeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-24 p-6 flex-1">{children}</main>
      <Footer />
    </div>
  )
}

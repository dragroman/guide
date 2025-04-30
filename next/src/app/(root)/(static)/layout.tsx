// src/app/(root)/layout.tsx
import { Footer } from "@/components/navigation/Footer"
import { Header } from "@/components/navigation/Header"
import type { ReactNode } from "react"

export default function StaticLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container max-w-[600px] mx-auto py-20 md:py-32 px-4">
      {children}
    </div>
  )
}

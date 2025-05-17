// src/app/(root)/layout.tsx
import { Footer } from "@/widgets/footer/ui/Footer"
import { Header } from "@/widgets/header"
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

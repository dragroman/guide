// src/app/(root)/layout.tsx
import { Footer } from "@widgets/footer/ui/Footer"
import { Header } from "@widgets/header"
import type { ReactNode } from "react"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="container max-w-[600px] mx-auto py-20 md:py-32 px-4">
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  )
}

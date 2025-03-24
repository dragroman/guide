// src/app/(root)/blog/[...slug]/layout.tsx
import { Footer } from "@/components/navigation/Footer"
import { Header } from "@/components/navigation/Header"
import type { ReactNode } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Блог",
  },
  description: "Истории, советы и наблюдения о Китае от местного жителя",
}

interface BlogSlugLayoutProps {
  children: ReactNode
}

export default function BlogSlugLayout({ children }: BlogSlugLayoutProps) {
  return (
    <div className="py-20">
      {/* Основной контент */}
      <div className="container max-w-3xl mx-auto px-4 py-12 md:py-16">
        <article className="prose prose-md max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg">
          {children}
        </article>
      </div>
    </div>
  )
}

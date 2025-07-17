import { cn } from "@shared/lib/utils"
import React, { ReactNode } from "react"

export function Typography({
  level = "h1",
  title,
  children,
  className,
  ...props
}: {
  level?: "h1" | "h2" | "h3" | "h4"
  title?: string
  children?: ReactNode
  className?: string
}) {
  const Tag = `${level}` as const

  const styles = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
    h2: "scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  }

  return (
    <Tag className={cn(styles[level], { className })} {...props}>
      {title}
      {children}
    </Tag>
  )
}

export function TypographyP({
  children,
  title,
}: {
  children?: ReactNode
  title?: string
}) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}
export function TypographyBlockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  )
}
export function TypographyList({ items }: { items: string[] }) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
export function TypographyLead({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground text-xl">{children}</p>
}
export function TypographyLarge({ children }: { children: ReactNode }) {
  return <div className="text-lg font-semibold">{children}</div>
}

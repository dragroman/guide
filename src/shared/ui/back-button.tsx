"use client"

import { Button, ButtonProps } from "./button"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

export const BackButton = ({
  children,
  className,
  variant = "outline",
}: {
  variant?: ButtonProps["variant"]
  children: ReactNode
  className?: string
}) => {
  const router = useRouter()
  return (
    <Button
      variant={variant}
      aria-label="Back"
      className={className}
      onClick={() => router.back()}
    >
      {children}
    </Button>
  )
}

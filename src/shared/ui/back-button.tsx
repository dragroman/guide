"use client"

import { Button } from "./button"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

export const BackButton = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const router = useRouter()
  return (
    <Button
      variant="outline"
      aria-label="Back"
      className={className}
      onClick={() => router.back()}
    >
      {children}
    </Button>
  )
}

"use client"

import { Dialog } from "@shared/ui/dialog"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface ModalProps {
  children: React.ReactNode
  onClose?: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false)
      if (onClose) {
        onClose()
      }
      // Небольшая задержка для анимации закрытия
      setTimeout(() => {
        router.back()
      }, 150)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children}
    </Dialog>
  )
}

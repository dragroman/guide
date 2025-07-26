"use client"

import { useState, useTransition } from "react"
import { Heart } from "lucide-react"
import { Button } from "@shared/ui/button"

interface FavoriteButtonProps {
  entityId: string
  flagId: string
  initialFlagged?: boolean
  className?: string
}
import { toast } from "sonner"
import { addFlag, removeFlag } from "../services/flag-service"
import { useSession } from "next-auth/react"

// Server action для работы с флагами
async function toggleFlag(
  flagId: string,
  entityId: string,
  isFlagged: boolean
) {
  if (isFlagged) {
    return await removeFlag(flagId, entityId)
  } else {
    return await addFlag(flagId, entityId)
  }
}

export function FavoriteButton({
  entityId,
  flagId = "favorite",
  initialFlagged = false,
  className = "",
}: FavoriteButtonProps) {
  const { data: session, status } = useSession()
  const [isFlagged, setIsFlagged] = useState(initialFlagged)
  const [isPending, startTransition] = useTransition()

  const handleToggle = (e: React.MouseEvent) => {
    if (status === "unauthenticated") {
      window.location.href = "/signin"
      return
    }
    e.preventDefault()
    e.stopPropagation()

    startTransition(async () => {
      try {
        await toggleFlag(flagId, entityId, isFlagged)
        setIsFlagged(!isFlagged)

        toast(isFlagged ? "Удалено из избранного" : "Добавлено в избранное")
      } catch (error) {
        toast.error("Ошибка", {
          description: "Не удалось обновить избранное",
        })
      }
    })
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      className={`text-gray-600 hover:text-red-500 hover:bg-white/80 p-2 backdrop-blur-sm ${className}`}
      onClick={handleToggle}
      disabled={isPending}
    >
      <Heart
        className={`h-4 w-4 ${isFlagged ? "fill-red-500 text-red-500" : ""}`}
      />
    </Button>
  )
}

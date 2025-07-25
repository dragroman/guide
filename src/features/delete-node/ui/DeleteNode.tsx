"use client"

import { useState } from "react"
import { deleteNodeAction } from "../api/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/ui/alert-dialog"
import { Button } from "@shared/ui/button"
import { toast } from "sonner"
import { access } from "fs"
import { useRouter } from "next/navigation"

interface DeleteNodeProps {
  nodeId: string
  nodeType: string
}

export const DeleteNode = ({ nodeId, nodeType }: DeleteNodeProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      // Вызываем Server Action - выполняется на сервере
      const result = await deleteNodeAction(nodeType, nodeId)

      if (result.success) {
        toast.success(result.message)
        router.back()
        setIsOpen(false)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Ошибка:", error)
      toast.error("Произошла ошибка")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={isDeleting}>
          {isDeleting ? "Удаление..." : "Удалить"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Нода будет окончательно удалена.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            autoFocus
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Удаление..." : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

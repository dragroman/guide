"use client"
import { useState } from "react"
import { AddSpotForm } from "./AddSpotForm"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/ui/alert-dialog"

export const AddSpot = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const handleSuccess = () => {
    setShowSuccessDialog(true)
  }
  return (
    <>
      <AddSpotForm onSuccess={handleSuccess} />
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Место успешно создано!</AlertDialogTitle>
            <AlertDialogDescription>
              Ваше место было добавлено и теперь доступно для просмотра.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              Продолжить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

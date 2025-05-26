"use client"

import { LoginForm, Modal } from "@features/login"
import { DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { useRouter } from "next/navigation"

export default function LoginModal() {
  const router = useRouter()

  const handleClose = () => {
    // Дополнительная логика при закрытии модального окна
    console.log("Модальное окно закрывается")
  }

  const handleLoginSuccess = () => {
    // Закрываем модальное окно и перенаправляем
    router.back()
    setTimeout(() => {
      router.push("/")
    }, 200)
  }
  return (
    <Modal onClose={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вход в систему</DialogTitle>
        </DialogHeader>
        <LoginForm onSuccess={handleLoginSuccess} />
      </DialogContent>
    </Modal>
  )
}

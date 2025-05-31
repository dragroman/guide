"use client"

import { SignInForm, Modal } from "@features/auth/sign-in"
import { Button } from "@shared/ui/button"
import { DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginModal() {
  const router = useRouter()

  const handleLoginSuccess = () => {
    // Закрываем модальное окно и перенаправляем
    router.back()
    setTimeout(() => {
      router.push("/")
    }, 200)
  }

  const handleSignupClick = () => {
    router.back() // Закрываем модальное окно
    setTimeout(() => {
      router.push("/signup") // Переходим на страницу регистрации
    }, 200)
  }
  return (
    <Modal>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вход в систему</DialogTitle>
        </DialogHeader>
        <SignInForm onSuccess={handleLoginSuccess} />

        <div className="mt-4 text-center">
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={handleSignupClick}
          >
            Создать аккаунт
          </Button>
        </div>
      </DialogContent>
    </Modal>
  )
}

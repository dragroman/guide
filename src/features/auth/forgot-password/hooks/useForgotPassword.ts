"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { ForgotPasswordData, ResetPasswordData } from "../model/types"

export function useForgotPassword() {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">(
    "email"
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState<string>("")
  const [remainingAttempts, setRemainingAttempts] = useState(5)

  const requestPasswordReset = async (data: ForgotPasswordData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setEmail(data.email)
        setStep("otp")
        toast.success("Код подтверждения отправлен на ваш email")
      } else {
        setError(result.error)
        if (result.remainingAttempts !== undefined) {
          setRemainingAttempts(result.remainingAttempts)
        }
      }
    } catch (err) {
      setError("Ошибка сети. Проверьте подключение к интернету")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async (otpCode: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/verify-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode }),
      })

      const result = await response.json()

      if (result.success) {
        setStep("reset")
        toast.success("Код подтвержден. Установите новый пароль")
      } else {
        setError(result.error || "Неверный код подтверждения")
      }
    } catch (err) {
      setError("Ошибка сети")
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: data.password }),
      })

      const result = await response.json()

      if (result.success) {
        setStep("success")
        toast.success("Пароль успешно изменен!")

        setTimeout(() => {
          router.push("/signin")
        }, 2000)
      } else {
        setError(result.error || "Ошибка изменения пароля")
      }
    } catch (err) {
      setError("Ошибка сети")
    } finally {
      setIsLoading(false)
    }
  }

  const resendOtp = async () => {
    await requestPasswordReset({ email })
  }

  const goBack = () => {
    setStep("email")
    setError(null)
  }

  return {
    step,
    isLoading,
    error,
    email,
    remainingAttempts,
    requestPasswordReset,
    verifyOtp,
    resetPassword,
    resendOtp,
    goBack,
  }
}

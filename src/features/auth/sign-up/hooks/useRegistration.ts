"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { RegistrationData, ApiResponse } from "../model/registration"

interface UseRegistrationReturn {
  step: "form" | "otp" | "success"
  isLoading: boolean
  error: string | null
  registrationData: RegistrationData | null
  otpInfo: {
    expiresAt: number
    attempts: number
    maxAttempts: number
    canResend: boolean
    resendCooldown: number
  } | null
  sendOtp: (data: RegistrationData) => Promise<void>
  verifyOtp: (otpCode: string) => Promise<void>
  resendOtp: () => Promise<void>
  goBack: () => void
  resetForm: () => void
}

export function useRegistration(): UseRegistrationReturn {
  const router = useRouter()
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null)
  const [otpInfo, setOtpInfo] = useState<any>(null)

  const sendOtp = async (data: RegistrationData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result: ApiResponse = await response.json()

      if (result.success) {
        setRegistrationData(data)
        setStep("otp")
        toast.success("Код подтверждения отправлен на ваш email")

        // Start polling for session info
        pollOtpInfo(data.email)
      } else {
        setError(result.error || "Ошибка отправки кода")
        toast.error(result.error || "Ошибка отправки кода")
      }
    } catch (err) {
      const message = "Ошибка сети. Проверьте подключение к интернету"
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async (otpCode: string) => {
    if (!registrationData) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...registrationData,
          otpCode,
        }),
      })

      const result: ApiResponse = await response.json()

      if (result.success) {
        setStep("success")
        toast.success("Регистрация успешно завершена!")

        // Redirect after success
        setTimeout(() => {
          router.push("/signin")
        }, 2000)
      } else {
        setError(result.error || "Неверный код подтверждения")
        toast.error(result.error || "Неверный код подтверждения")

        // Update attempts info
        pollOtpInfo(registrationData.email)
      }
    } catch (err) {
      const message = "Ошибка сети. Проверьте подключение к интернету"
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const resendOtp = async () => {
    if (!registrationData) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      })

      const result: ApiResponse = await response.json()

      if (result.success) {
        toast.success("Новый код отправлен на ваш email")
        pollOtpInfo(registrationData.email)
      } else {
        setError(result.error || "Ошибка повторной отправки")
        toast.error(result.error || "Ошибка повторной отправки")
      }
    } catch (err) {
      const message = "Ошибка сети"
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const pollOtpInfo = async (email: string) => {
    try {
      const response = await fetch(
        `/api/auth/otp-info?email=${encodeURIComponent(email)}`
      )
      const result = await response.json()

      if (result.success) {
        setOtpInfo(result.data)
      }
    } catch (err) {
      console.error("Failed to fetch OTP info:", err)
    }
  }

  const goBack = () => {
    setStep("form")
    setError(null)
    setOtpInfo(null)
  }

  const resetForm = () => {
    setStep("form")
    setIsLoading(false)
    setError(null)
    setRegistrationData(null)
    setOtpInfo(null)
  }

  return {
    step,
    isLoading,
    error,
    registrationData,
    otpInfo,
    sendOtp,
    verifyOtp,
    resendOtp,
    goBack,
    resetForm,
  }
}

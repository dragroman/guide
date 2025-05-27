"use client"

import { useState, useEffect } from "react"
import { Button } from "@shared/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@shared/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@shared/ui/input-otp"
import { ArrowLeft, Mail, Clock, RotateCcw } from "lucide-react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

interface OtpFormProps {
  email: string
  onSubmit: (otpCode: string) => Promise<void>
  onResend: () => Promise<void>
  onBack: () => void
  isLoading: boolean
  error: string | null
  otpInfo: {
    expiresAt: number
    attempts: number
    maxAttempts: number
    canResend: boolean
    resendCooldown: number
  } | null
}

export function OtpForm({
  email,
  onSubmit,
  onResend,
  onBack,
  isLoading,
  error,
  otpInfo,
}: OtpFormProps) {
  const [otpCode, setOtpCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)

  // Timer для истечения OTP
  useEffect(() => {
    if (!otpInfo?.expiresAt) return

    const interval = setInterval(() => {
      const remaining = Math.max(0, otpInfo.expiresAt - Date.now())
      setTimeLeft(remaining)

      if (remaining === 0) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [otpInfo?.expiresAt])

  // Таймер для повторной отправки
  useEffect(() => {
    if (resendCooldown > 0) {
      const interval = setInterval(() => {
        setResendCooldown((prev) => Math.max(0, prev - 1))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [resendCooldown])

  // Сброс ошибки при изменении кода
  useEffect(() => {
    if (otpCode.length > 0 && error) {
      // Можно очистить ошибку при начале ввода нового кода
      // setError(null) - если есть возможность сбросить ошибку
    }
  }, [otpCode, error])

  const handleResend = async () => {
    await onResend()
    setResendCooldown(60) // 1 минута кулдауна
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const isCodeComplete = otpCode.length === 6

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl font-bold">
            Подтверждение email
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>Код отправлен на {email}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md dark:bg-red-950 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        {/* OTP Input с использованием shadcn компонента */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otpCode}
              onChange={(value) => setOtpCode(value)}
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Информация о таймере и попытках */}
          <div className="text-center space-y-2">
            {timeLeft > 0 && (
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Код действителен: {formatTime(timeLeft)}</span>
              </div>
            )}

            {otpInfo && (
              <p className="text-xs text-muted-foreground">
                Попыток осталось: {otpInfo.maxAttempts - otpInfo.attempts}
              </p>
            )}
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="space-y-3">
          <Button
            onClick={() => onSubmit(otpCode)}
            className="w-full"
            disabled={!isCodeComplete || isLoading}
          >
            {isLoading ? "Проверка..." : "Подтвердить"}
          </Button>

          <div className="text-center">
            {resendCooldown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Повторная отправка через {resendCooldown} сек.
              </p>
            ) : (
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={isLoading}
                className="text-sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Отправить код повторно
              </Button>
            )}
          </div>
        </div>

        {/* Текст помощи */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Не получили код? Проверьте папку Спам
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-xs"
          >
            Изменить email адрес
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

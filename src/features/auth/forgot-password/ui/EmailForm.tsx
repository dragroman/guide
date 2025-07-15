"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "../model/validation"
import type { ForgotPasswordData } from "../model/types"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { Label } from "@shared/ui/label"
import { Alert, AlertDescription } from "@shared/ui/alert"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

interface EmailFormProps {
  onSubmit: (data: ForgotPasswordData) => Promise<void>
  isLoading: boolean
  error: string | null
  remainingAttempts: number
}

export function EmailForm({
  onSubmit,
  isLoading,
  error,
  remainingAttempts,
}: EmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const t = useTranslations("forgotPassword")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground">{t("email")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              className="pl-10"
              disabled={isLoading}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {remainingAttempts > 0 && remainingAttempts < 5 && (
                <span className="block mt-1 font-semibold">
                  {t("attemptsLeft")} {remainingAttempts}
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || remainingAttempts === 0}
        >
          {isLoading ? "Отправка..." : "Отправить код"}
        </Button>

        <div className="text-center">
          <Link
            href="/signin"
            className="text-sm text-muted-foreground hover:text-primary inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t("backToLogin")}
          </Link>
        </div>
      </form>
    </div>
  )
}

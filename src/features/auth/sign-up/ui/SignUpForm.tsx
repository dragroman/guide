"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrationSchema } from "../model/validation"
import type { RegistrationData } from "../model/registration"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { Label } from "@shared/ui/label"
import { Alert, AlertDescription } from "@shared/ui/alert"
import { Eye, EyeOff, User, Mail, Lock, UserCheck, Phone } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function SignUpForm({
  onSubmit,
  isLoading,
  error,
}: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  })

  const password = watch("password")
  const t = useTranslations("signUp")

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "" }

    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z\d]/.test(password)) score++

    const labels = ["Очень слабый", "Слабый", "Средний", "Хороший", "Отличный"]
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ]

    return {
      score,
      label: labels[score - 1] || "",
      color: colors[score - 1] || "",
    }
  }

  const passwordStrength = getPasswordStrength(password || "")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="email@example.com"
            className="pl-10"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")}</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+7 (xxx) xxx-xx-xx"
            className="pl-10"
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder={t("enterPassword")}
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1 top-1 h-8 w-8 p-0"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}

        {/* Password Strength Indicator */}
        {/* {password && (
          <div className="space-y-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    level <= passwordStrength.score
                      ? passwordStrength.color
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Надежность пароля: {passwordStrength.label}
            </p>
          </div>
        )} */}
      </div>

      {/* Optional Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-muted-foreground">
            {t("name")}{" "}
            <span className="text-xs">
              {"("}
              {t("nonRequired")}
              {")"}
            </span>
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder={t("name")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-muted-foreground">
            {t("surname")}{" "}
            <span className="text-xs">
              {"("}
              {t("nonRequired")}
              {")"}
            </span>
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder={t("surname")}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
        {isLoading ? t("submitting") : t("submit")}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Нажимая Продолжить, вы соглашаетесь с{" "}
        <a href="/terms" className="underline hover:text-primary">
          условиями использования
        </a>{" "}
        и{" "}
        <a href="/privacy" className="underline hover:text-primary">
          политикой конфиденциальности
        </a>
      </p>
      <div className="mt-4 text-center">
        <Button asChild variant="link">
          <Link href="/signin">{t("login")}</Link>
        </Button>
      </div>
    </form>
  )
}

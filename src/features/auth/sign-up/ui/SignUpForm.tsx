"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrationSchema } from "../model/validation"
import type { RegistrationData } from "../model/registration"
import { Input } from "@shared/ui/input"
import { Button } from "@shared/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@shared/ui/card"
import { Eye, EyeOff, User, Mail, Lock, UserCheck } from "lucide-react"

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function RegistrationForm({
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
  const username = watch("username")
  const email = watch("email")

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
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            {...register("email")}
            type="email"
            placeholder="email@example.com"
            className="pl-10"
          />
          {errors.email?.message && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>
      </div>

      {/* Username Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Имя пользователя</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            {...register("username")}
            placeholder="username"
            className="pl-10"
          />
          {errors.username?.message && (
            <span className="text-red-500 text-xs">
              {errors.username.message}
            </span>
          )}
          {username && !errors.username && (
            <UserCheck className="absolute right-3 top-3 h-4 w-4 text-green-500" />
          )}
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Пароль</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Введите пароль"
            className="pl-10 pr-10"
          />
          {errors.password?.message && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-1">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full ${
                    level <= passwordStrength.score
                      ? passwordStrength.color
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Надежность пароля: {passwordStrength.label}
            </p>
          </div>
        )}
      </div>

      {/* Optional Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Имя <span className="text-xs">(необязательно)</span>
          </label>
          <Input {...register("firstName")} placeholder="Имя" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Фамилия <span className="text-xs">(необязательно)</span>
          </label>
          <Input {...register("lastName")} placeholder="Фамилия" />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
        {isLoading ? "Отправка..." : "Продолжить"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Нажимая `Продолжить`, вы соглашаетесь с{" "}
        <a href="/terms" className="underline hover:text-foreground">
          условиями использования
        </a>{" "}
        и{" "}
        <a href="/privacy" className="underline hover:text-foreground">
          политикой конфиденциальности
        </a>
      </p>
    </form>
  )
}

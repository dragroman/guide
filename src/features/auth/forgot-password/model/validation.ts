import { z } from "zod"

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Введите корректный email")
    .min(1, "Email обязателен"),
})

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .regex(/[a-z]/, "Пароль должен содержать строчные буквы")
      .regex(/[A-Z]/, "Пароль должен содержать заглавные буквы")
      .regex(/\d/, "Пароль должен содержать цифры"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

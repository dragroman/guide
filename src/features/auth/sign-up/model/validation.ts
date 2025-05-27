import { z } from "zod"

export const registrationSchema = z.object({
  email: z.string().email("Неверный формат email"),
  username: z
    .string()
    .min(3, "Имя пользователя должно содержать минимум 3 символа")
    .max(30, "Имя пользователя не должно превышать 30 символов")
    .regex(/^[a-zA-Z0-9_]+$/, "Только буквы, цифры и подчеркивания"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export const otpSchema = z.object({
  email: z.string().email(),
  otpCode: z
    .string()
    .length(6, "OTP код должен содержать 6 цифр")
    .regex(/^\d{6}$/, "OTP код должен содержать только цифры"),
})

import { z } from "zod"

export const formRestaurantSchema = z.object({
  title: z
    .string()
    .min(2, "Название должно содержать минимум 2 символа")
    .max(50),
  titleZh: z
    .string()
    .min(2, "Название на китайском должно содержать минимум 2 символа")
    .max(50),
  cityId: z.string().min(1, "Выберите город"),
  categoryId: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  addressZh: z.string().min(2).max(100),
  phone: z.string().min(5).max(20),
  workingHours: z.string().min(2).max(100),
})

import { workingHoursEntrySchema } from "@features/office-hours"
import { z } from "zod"

export const formSpotSchema = z.object({
  title: z
    .string()
    .min(2, "Название должно содержать минимум 2 символа")
    .max(50),
  titleZh: z
    .string()
    .min(2, "Название на китайском должно содержать минимум 2 символа")
    .max(50),
  body: z.string().optional(),
  cityId: z.string().min(1, "Выберите город"),
  categoryId: z.string().min(2).max(50),
  cuisineTypes: z.array(z.string()).optional(),
  hotelStars: z.array(z.string()).optional(),
  attractionTypes: z.array(z.string()).optional(),
  addressZh: z.string().min(2).max(100),
  workingHours: z.array(workingHoursEntrySchema),
  images: z.array(z.string()).optional(),
  mapLinks: z
    .array(
      z.object({
        url: z.string().url("Введите корректный URL"),
      })
    )
    .optional(),
  rating: z.string().optional(),
})

export type SpotFormData = z.infer<typeof formSpotSchema>

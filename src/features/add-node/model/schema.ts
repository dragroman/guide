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
  addressZh: z.string().min(2).max(100),
  phone: z.string().min(5).max(20),
  workingHours: z.object({
    day: z.number(),
    all_day: z.boolean().optional(),
    starthours: z.number().optional(),
    endhours: z.number().optional(),
    comment: z.string().optional(),
  }),
  images: z.array(z.string()).optional(),
})

export type SpotFormData = z.infer<typeof formSpotSchema>

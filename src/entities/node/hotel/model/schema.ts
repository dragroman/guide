import { z } from "zod"

export const hotelSchema = z.object({
  title: z.string().min(1, "Название отеля обязательно"),
})

export type HotelType = z.infer<typeof hotelSchema>

import { z } from "zod"

export const workingHoursEntrySchema = z
  .object({
    day: z.number().min(0).max(6),
    all_day: z.boolean().optional(),
    starthours: z.number().min(0).max(2400).optional(),
    endhours: z.number().min(0).max(2400).optional(),
    comment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.all_day) {
      if (data.starthours === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Укажите время начала работы",
          path: ["starthours"],
        })
      }
      if (data.endhours === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Укажите время окончания работы",
          path: ["endhours"],
        })
      }

      if (data.starthours !== undefined && data.endhours !== undefined) {
        if (data.starthours >= data.endhours && data.endhours !== 2400) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Время окончания должно быть позже времени начала",
            path: ["endhours"],
          })
        }
      }
    }
  })

export const workingHoursSchema = z.array(workingHoursEntrySchema)

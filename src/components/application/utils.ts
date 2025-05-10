import { format } from "date-fns"
import { ZodError } from "zod"
import { DateRange } from "react-day-picker"

/**
 * Обработчик ошибок Zod
 */
export function handleZodError(error: ZodError): Record<string, string> {
  const errorMap: Record<string, string> = {}

  error.errors.forEach((err) => {
    const path = err.path.join(".")
    errorMap[path] = err.message
  })

  return errorMap
}

/**
 * Выбор правильного склонения слова "день"
 */
export function getDaysText(days: number): string {
  if (days % 10 === 1 && days % 100 !== 11) {
    return "день"
  } else if (
    [2, 3, 4].includes(days % 10) &&
    ![12, 13, 14].includes(days % 100)
  ) {
    return "дня"
  } else {
    return "дней"
  }
}

/**
 * Форматирование дат для отправки на сервер
 */
export function formatDateRangeForSubmission(dateRange: DateRange): {
  from: string | undefined
  to: string | undefined
} {
  return {
    from: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined,
    to: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
  }
}

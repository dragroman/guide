/**
 * Утилиты для работы с часами работы
 */

import { WorkingHoursEntry } from "../model/types"

// Дни недели
export const DAYS = [
  { value: 0, label: "Понедельник", short: "Пн" },
  { value: 1, label: "Вторник", short: "Вт" },
  { value: 2, label: "Среда", short: "Ср" },
  { value: 3, label: "Четверг", short: "Чт" },
  { value: 4, label: "Пятница", short: "Пт" },
  { value: 5, label: "Суббота", short: "Сб" },
  { value: 6, label: "Воскресенье", short: "Вс" },
] as const

/**
 * Предустановленные шаблоны часов работы
 */
export const WORKING_HOURS_PRESETS = {
  restaurant: {
    name: "Ресторан",
    description: "Обед и ужин, выходной в понедельник",
    hours: [
      { day: 1, starthours: 1100, endhours: 2300 },
      { day: 2, starthours: 1100, endhours: 2300 },
      { day: 3, starthours: 1100, endhours: 2300 },
      { day: 4, starthours: 1100, endhours: 2300 },
      { day: 5, starthours: 1100, endhours: 2400 },
      { day: 6, starthours: 1100, endhours: 2400 },
      { day: 0, starthours: 1200, endhours: 2300 },
    ] as WorkingHoursEntry[],
  },
  cafe: {
    name: "Кафе",
    description: "Завтрак, обед и ужин каждый день",
    hours: [
      { day: 0, starthours: 800, endhours: 2200 },
      { day: 1, starthours: 800, endhours: 2200 },
      { day: 2, starthours: 800, endhours: 2200 },
      { day: 3, starthours: 800, endhours: 2200 },
      { day: 4, starthours: 800, endhours: 2300 },
      { day: 5, starthours: 900, endhours: 2300 },
      { day: 6, starthours: 900, endhours: 2200 },
    ] as WorkingHoursEntry[],
  },
  government: {
    name: "Госучреждение",
    description: "Рабочие дни с 9 до 18, выходные",
    hours: [
      { day: 0, starthours: 900, endhours: 1800 },
      { day: 1, starthours: 900, endhours: 1800 },
      { day: 2, starthours: 900, endhours: 1800 },
      { day: 3, starthours: 900, endhours: 1800 },
      { day: 4, starthours: 900, endhours: 1700 },
    ] as WorkingHoursEntry[],
  },
  museum: {
    name: "Музей",
    description: "Выходной в понедельник, работает до 18:00",
    hours: [
      { day: 1, starthours: 1000, endhours: 1800 },
      { day: 2, starthours: 1000, endhours: 1800 },
      { day: 3, starthours: 1000, endhours: 1800 },
      { day: 4, starthours: 1000, endhours: 1800 },
      { day: 5, starthours: 1000, endhours: 1800 },
      { day: 6, starthours: 1000, endhours: 1800 },
    ] as WorkingHoursEntry[],
  },
  bank: {
    name: "Банк",
    description: "Будни до 18:00, пятница до 17:00",
    hours: [
      { day: 0, starthours: 900, endhours: 1800 },
      { day: 1, starthours: 900, endhours: 1800 },
      { day: 2, starthours: 900, endhours: 1800 },
      { day: 3, starthours: 900, endhours: 1800 },
      { day: 4, starthours: 900, endhours: 1700 },
    ] as WorkingHoursEntry[],
  },
  shop: {
    name: "Магазин",
    description: "Каждый день с 10:00 до 22:00",
    hours: [
      { day: 0, starthours: 1000, endhours: 2200 },
      { day: 1, starthours: 1000, endhours: 2200 },
      { day: 2, starthours: 1000, endhours: 2200 },
      { day: 3, starthours: 1000, endhours: 2200 },
      { day: 4, starthours: 1000, endhours: 2200 },
      { day: 5, starthours: 1000, endhours: 2200 },
      { day: 6, starthours: 1000, endhours: 2100 },
    ] as WorkingHoursEntry[],
  },
  clinic: {
    name: "Поликлиника",
    description: "Будни с утра до вечера, суббота сокращенный",
    hours: [
      { day: 0, starthours: 800, endhours: 2000 },
      { day: 1, starthours: 800, endhours: 2000 },
      { day: 2, starthours: 800, endhours: 2000 },
      { day: 3, starthours: 800, endhours: 2000 },
      { day: 4, starthours: 800, endhours: 2000 },
      { day: 5, starthours: 900, endhours: 1800 },
    ] as WorkingHoursEntry[],
  },
  park: {
    name: "Парк",
    description: "Круглосуточно открыт",
    hours: [
      { day: 0, all_day: true },
      { day: 1, all_day: true },
      { day: 2, all_day: true },
      { day: 3, all_day: true },
      { day: 4, all_day: true },
      { day: 5, all_day: true },
      { day: 6, all_day: true },
    ] as WorkingHoursEntry[],
  },
} as const

/**
 * Генерация временных слотов с шагом 30 минут
 */
export const generateTimeSlots = () => {
  const slots = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = hour * 100 + minute
      const display = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
      slots.push({ value: time, label: display })
    }
  }
  // Добавляем 24:00 как опцию для конца дня
  slots.push({ value: 2400, label: "24:00" })
  return slots
}

/**
 * Конвертация времени в формат отображения
 */
export const formatTime = (time: number): string => {
  if (time === 2400) return "24:00"
  const hours = Math.floor(time / 100)
  const minutes = time % 100
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}

/**
 * Конвертация времени из строки (HH:MM) в числовой формат
 */
export const parseTimeString = (timeString: string): number => {
  if (timeString === "24:00") return 2400
  const [hours, minutes] = timeString.split(":").map(Number)
  return hours * 100 + minutes
}

/**
 * Валидация временного диапазона
 */
export const validateTimeRange = (start?: number, end?: number): string[] => {
  const errors: string[] = []

  if (start === undefined || end === undefined) {
    return errors
  }

  if (start >= end && end !== 2400) {
    errors.push("Время окончания должно быть позже времени начала")
  }

  return errors
}

/**
 * Проверка корректности временного слота
 */
export const isValidTimeSlot = (entry: WorkingHoursEntry): boolean => {
  if (entry.all_day) return true

  if (entry.starthours === undefined || entry.endhours === undefined) {
    return false
  }

  return validateTimeRange(entry.starthours, entry.endhours).length === 0
}

/**
 * Получение названия дня по номеру
 */
export const getDayName = (dayNumber: number, short = false): string => {
  const day = DAYS.find((d) => d.value === dayNumber)
  return day ? (short ? day.short : day.label) : "Неизвестный день"
}

/**
 * Группировка часов работы по дням
 */
export const groupHoursByDay = (
  hours: WorkingHoursEntry[]
): Record<number, WorkingHoursEntry[]> => {
  const grouped: Record<number, WorkingHoursEntry[]> = {}

  // Инициализируем все дни
  DAYS.forEach((day) => {
    grouped[day.value] = []
  })

  // Группируем по дням
  hours.forEach((entry) => {
    if (!grouped[entry.day]) {
      grouped[entry.day] = []
    }
    grouped[entry.day].push(entry)
  })

  return grouped
}

/**
 * Конвертация сгруппированных часов обратно в плоский массив
 */
export const flattenGroupedHours = (
  grouped: Record<number, WorkingHoursEntry[]>
): WorkingHoursEntry[] => {
  const flat: WorkingHoursEntry[] = []
  Object.values(grouped).forEach((dayEntries) => {
    flat.push(...dayEntries)
  })
  return flat
}

/**
 * Получение читаемого описания часов работы для дня
 */
export const getDayScheduleDescription = (
  entries: WorkingHoursEntry[]
): string => {
  if (!entries || entries.length === 0) {
    return "Выходной"
  }

  if (entries.length === 1 && entries[0].all_day) {
    return "Круглосуточно"
  }

  const timeRanges = entries
    .filter(
      (entry) =>
        !entry.all_day &&
        entry.starthours !== undefined &&
        entry.endhours !== undefined
    )
    .map(
      (entry) =>
        `${formatTime(entry.starthours!)}–${formatTime(entry.endhours!)}`
    )

  if (timeRanges.length === 0) {
    return "Время не указано"
  }

  return timeRanges.join(", ")
}

/**
 * Получение полного описания расписания
 */
export const getFullScheduleDescription = (
  hours: WorkingHoursEntry[]
): string => {
  const grouped = groupHoursByDay(hours)
  const descriptions: string[] = []

  DAYS.forEach((day) => {
    const dayEntries = grouped[day.value]
    const dayDescription = getDayScheduleDescription(dayEntries)
    descriptions.push(`${day.short}: ${dayDescription}`)
  })

  return descriptions.join("; ")
}

/**
 * Проверка, работает ли заведение в указанное время
 */
export const isOpenAt = (
  hours: WorkingHoursEntry[],
  dayOfWeek: number,
  time: number
): boolean => {
  const dayEntries = hours.filter((entry) => entry.day === dayOfWeek)

  if (dayEntries.length === 0) {
    return false // Выходной
  }

  return dayEntries.some((entry) => {
    if (entry.all_day) {
      return true
    }

    if (entry.starthours === undefined || entry.endhours === undefined) {
      return false
    }

    // Обработка случая, когда заведение работает до полуночи или после
    if (entry.endhours === 2400 || entry.endhours < entry.starthours) {
      return (
        time >= entry.starthours ||
        time <= (entry.endhours === 2400 ? 2359 : entry.endhours)
      )
    }

    return time >= entry.starthours && time <= entry.endhours
  })
}

/**
 * Получение следующего времени открытия
 */
export const getNextOpenTime = (
  hours: WorkingHoursEntry[],
  currentDay: number,
  currentTime: number
): {
  day: number
  time: number
  dayName: string
} | null => {
  // Проверяем оставшиеся дни недели, начиная с текущего
  for (let i = 0; i < 7; i++) {
    const checkDay = (currentDay + i) % 7
    const dayEntries = hours.filter((entry) => entry.day === checkDay)

    if (dayEntries.length === 0) continue

    for (const entry of dayEntries) {
      if (entry.all_day) {
        return {
          day: checkDay,
          time: 0,
          dayName: getDayName(checkDay),
        }
      }

      if (entry.starthours !== undefined) {
        // Если это текущий день, проверяем, что время еще не прошло
        if (i === 0 && entry.starthours <= currentTime) {
          continue
        }

        return {
          day: checkDay,
          time: entry.starthours,
          dayName: getDayName(checkDay),
        }
      }
    }
  }

  return null // Заведение никогда не работает
}

/**
 * Копирование расписания с другого дня
 */
export const copyScheduleFromDay = (
  currentSchedule: Record<number, WorkingHoursEntry[]>,
  fromDay: number,
  toDay: number
): Record<number, WorkingHoursEntry[]> => {
  const newSchedule = { ...currentSchedule }
  const sourceEntries = currentSchedule[fromDay] || []

  newSchedule[toDay] = sourceEntries.map((entry) => ({
    ...entry,
    day: toDay,
  }))

  return newSchedule
}

/**
 * Экспорт типов
 */
export type { WorkingHoursEntry }
export type WorkingHoursPreset = keyof typeof WORKING_HOURS_PRESETS
export type DayOfWeek = (typeof DAYS)[number]["value"]

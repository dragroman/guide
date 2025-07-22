"use client"

import React, { useState } from "react"
import { Control, useController } from "react-hook-form"
import {
  Clock,
  Copy,
  Plus,
  Trash2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { Label } from "@shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@shared/ui/collapsible"
import { cn } from "@shared/lib/utils"

interface WorkingHoursEntry {
  day: number
  all_day?: boolean
  starthours?: number
  endhours?: number
  comment?: string
}

interface MobileWorkingHoursFieldProps {
  control: Control<any>
  name: string
  label?: string
  description?: string
  className?: string
}

// Используем те же константы, что и в основном компоненте
const DAYS = [
  { value: 0, label: "Понедельник", short: "Пн" },
  { value: 1, label: "Вторник", short: "Вт" },
  { value: 2, label: "Среда", short: "Ср" },
  { value: 3, label: "Четверг", short: "Чт" },
  { value: 4, label: "Пятница", short: "Пт" },
  { value: 5, label: "Суббота", short: "Сб" },
  { value: 6, label: "Воскресенье", short: "Вс" },
]

const PRESETS = {
  restaurant: {
    name: "Ресторан",
    hours: [
      { day: 0, starthours: 1100, endhours: 2300 },
      { day: 1, starthours: 1100, endhours: 2300 },
      { day: 2, starthours: 1100, endhours: 2300 },
      { day: 3, starthours: 1100, endhours: 2300 },
      { day: 4, starthours: 1100, endhours: 2400 },
      { day: 5, starthours: 1100, endhours: 2400 },
      { day: 6, starthours: 1200, endhours: 2300 },
    ],
  },
  cafe: {
    name: "Кафе",
    hours: [
      { day: 0, starthours: 800, endhours: 2200 },
      { day: 1, starthours: 800, endhours: 2200 },
      { day: 2, starthours: 800, endhours: 2200 },
      { day: 3, starthours: 800, endhours: 2200 },
      { day: 4, starthours: 800, endhours: 2300 },
      { day: 5, starthours: 900, endhours: 2300 },
      { day: 6, starthours: 900, endhours: 2200 },
    ],
  },
  government: {
    name: "Госучреждение",
    hours: [
      { day: 0, starthours: 900, endhours: 1800 },
      { day: 1, starthours: 900, endhours: 1800 },
      { day: 2, starthours: 900, endhours: 1800 },
      { day: 3, starthours: 900, endhours: 1800 },
      { day: 4, starthours: 900, endhours: 1700 },
    ],
  },
  shop: {
    name: "Магазин",
    hours: [
      { day: 0, starthours: 1000, endhours: 2200 },
      { day: 1, starthours: 1000, endhours: 2200 },
      { day: 2, starthours: 1000, endhours: 2200 },
      { day: 3, starthours: 1000, endhours: 2200 },
      { day: 4, starthours: 1000, endhours: 2200 },
      { day: 5, starthours: 1000, endhours: 2200 },
      { day: 6, starthours: 1000, endhours: 2100 },
    ],
  },
}

// Генерация временных слотов
const generateTimeSlots = () => {
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
  slots.push({ value: 2400, label: "24:00" })
  return slots
}

const TIME_SLOTS = generateTimeSlots()

// Форматирование времени для отображения
const formatTime = (time: number): string => {
  if (time === 2400) return "24:00"
  const hours = Math.floor(time / 100)
  const minutes = time % 100
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}

// Получение краткого описания дня
const getDayStatus = (entries: WorkingHoursEntry[]): string => {
  if (!entries || entries.length === 0) return "Выходной"

  if (entries.length === 1 && entries[0].all_day) return "Круглосуточно"

  const times = entries
    .filter((e) => !e.all_day && e.starthours && e.endhours)
    .map((e) => `${formatTime(e.starthours!)}–${formatTime(e.endhours!)}`)

  return times.length > 0 ? times.join(", ") : "Время не указано"
}

export const MobileWorkingHoursField: React.FC<
  MobileWorkingHoursFieldProps
> = ({
  control,
  name,
  label = "Часы работы",
  description = "Укажите часы работы",
  className,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
  })

  const [scheduleByDay, setScheduleByDay] = useState<
    Record<number, WorkingHoursEntry[]>
  >(() => {
    const schedule: Record<number, WorkingHoursEntry[]> = {}
    DAYS.forEach((day) => {
      schedule[day.value] = []
    })

    if (Array.isArray(field.value)) {
      field.value.forEach((entry: WorkingHoursEntry) => {
        if (!schedule[entry.day]) schedule[entry.day] = []
        schedule[entry.day].push(entry)
      })
    }

    return schedule
  })

  const [openDays, setOpenDays] = useState<Record<number, boolean>>({})
  const [showPresets, setShowPresets] = useState(false)

  // Обновление поля формы
  const updateFieldValue = (
    newSchedule: Record<number, WorkingHoursEntry[]>
  ) => {
    const flatSchedule: WorkingHoursEntry[] = []
    Object.values(newSchedule).forEach((dayEntries) => {
      flatSchedule.push(...dayEntries)
    })
    field.onChange(flatSchedule)
    setScheduleByDay(newSchedule)
  }

  // Основные функции (аналогично основному компоненту)
  const addTimeSlot = (day: number) => {
    const newSchedule = { ...scheduleByDay }
    if (!newSchedule[day]) newSchedule[day] = []

    newSchedule[day].push({
      day,
      starthours: 900,
      endhours: 1800,
      comment: "",
    })

    updateFieldValue(newSchedule)
  }

  const removeTimeSlot = (day: number, index: number) => {
    const newSchedule = { ...scheduleByDay }
    newSchedule[day].splice(index, 1)
    updateFieldValue(newSchedule)
  }

  const updateTimeSlot = (
    day: number,
    index: number,
    updates: Partial<WorkingHoursEntry>
  ) => {
    const newSchedule = { ...scheduleByDay }
    newSchedule[day][index] = { ...newSchedule[day][index], ...updates }
    updateFieldValue(newSchedule)
  }

  const setAllDay = (day: number, allDay: boolean) => {
    const newSchedule = { ...scheduleByDay }
    if (allDay) {
      newSchedule[day] = [{ day, all_day: true, comment: "" }]
    } else {
      newSchedule[day] = [{ day, starthours: 900, endhours: 1800, comment: "" }]
    }
    updateFieldValue(newSchedule)
  }

  const copyFromPreviousDay = (day: number) => {
    const prevDay = day === 0 ? 6 : day - 1
    const newSchedule = { ...scheduleByDay }
    newSchedule[day] = scheduleByDay[prevDay].map((entry) => ({
      ...entry,
      day,
    }))
    updateFieldValue(newSchedule)
  }

  const applyPreset = (preset: keyof typeof PRESETS) => {
    const newSchedule: Record<number, WorkingHoursEntry[]> = {}
    DAYS.forEach((day) => {
      newSchedule[day.value] = []
    })

    PRESETS[preset].hours.forEach((entry) => {
      if (!newSchedule[entry.day]) newSchedule[entry.day] = []
      newSchedule[entry.day].push(entry)
    })

    updateFieldValue(newSchedule)
    setShowPresets(false)
  }

  const clearAll = () => {
    const newSchedule: Record<number, WorkingHoursEntry[]> = {}
    DAYS.forEach((day) => {
      newSchedule[day.value] = []
    })
    updateFieldValue(newSchedule)
  }

  const toggleDay = (day: number) => {
    setOpenDays((prev) => ({ ...prev, [day]: !prev[day] }))
  }

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="space-y-3">
          {/* Быстрые действия */}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowPresets(!showPresets)}
              className="text-xs"
            >
              <Clock className="h-3 w-3 mr-1" />
              Шаблоны
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Очистить
            </Button>
          </div>

          {/* Предустановки */}
          {showPresets && (
            <div className="p-3 bg-muted/30 rounded-lg space-y-2">
              <div className="text-sm font-medium">Выберите шаблон:</div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(PRESETS).map(([key, preset]) => (
                  <Button
                    key={key}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(key as keyof typeof PRESETS)}
                    className="text-xs h-8"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Дни недели */}
          <div className="space-y-2">
            {DAYS.map((day) => {
              const dayEntries = scheduleByDay[day.value] || []
              const isOpen = openDays[day.value]
              const status = getDayStatus(dayEntries)

              return (
                <Collapsible
                  key={day.value}
                  open={isOpen}
                  onOpenChange={() => toggleDay(day.value)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-3 h-auto text-left border rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{day.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {status}
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-2 ml-3 space-y-3">
                    {/* Быстрые действия для дня */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setAllDay(day.value, true)}
                        className="text-xs h-7"
                      >
                        24/7
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addTimeSlot(day.value)}
                        className="text-xs h-7"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Время
                      </Button>
                      {day.value > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => copyFromPreviousDay(day.value)}
                          className="text-xs h-7"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Как вчера
                        </Button>
                      )}
                    </div>

                    {/* Временные слоты */}
                    {dayEntries.length > 0 ? (
                      <div className="space-y-2">
                        {dayEntries.map((entry, index) => (
                          <div
                            key={index}
                            className="p-3 bg-muted/20 rounded-md space-y-3"
                          >
                            {entry.all_day ? (
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-green-600">
                                  Круглосуточно
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setAllDay(day.value, false)}
                                  className="h-7 w-7 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                {/* Время */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label className="text-xs">Начало</Label>
                                    <Select
                                      value={entry.starthours?.toString()}
                                      onValueChange={(value) =>
                                        updateTimeSlot(day.value, index, {
                                          starthours: parseInt(value),
                                        })
                                      }
                                    >
                                      <SelectTrigger className="h-8 text-xs">
                                        <SelectValue placeholder="С" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {TIME_SLOTS.slice(0, -1).map((slot) => (
                                          <SelectItem
                                            key={slot.value}
                                            value={slot.value.toString()}
                                            className="text-xs"
                                          >
                                            {slot.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <Label className="text-xs">Конец</Label>
                                    <Select
                                      value={entry.endhours?.toString()}
                                      onValueChange={(value) =>
                                        updateTimeSlot(day.value, index, {
                                          endhours: parseInt(value),
                                        })
                                      }
                                    >
                                      <SelectTrigger className="h-8 text-xs">
                                        <SelectValue placeholder="До" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {TIME_SLOTS.map((slot) => (
                                          <SelectItem
                                            key={slot.value}
                                            value={slot.value.toString()}
                                            className="text-xs"
                                          >
                                            {slot.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                {/* Комментарий */}
                                <div>
                                  <Label className="text-xs">Комментарий</Label>
                                  <Input
                                    placeholder="Необязательно"
                                    value={entry.comment || ""}
                                    onChange={(e) =>
                                      updateTimeSlot(day.value, index, {
                                        comment: e.target.value,
                                      })
                                    }
                                    className="h-8 text-xs"
                                  />
                                </div>

                                {/* Удалить */}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeTimeSlot(day.value, index)
                                  }
                                  className="w-full h-7 text-destructive"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Удалить
                                </Button>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-sm text-muted-foreground">
                        Выходной день
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </div>
        </div>
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}

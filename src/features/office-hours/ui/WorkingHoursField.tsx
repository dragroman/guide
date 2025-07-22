"use client"

import React, { useState, useEffect } from "react"
import { Control, useController } from "react-hook-form"
import { Clock, Copy, Plus, Trash2, RotateCcw } from "lucide-react"
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
import { WorkingHoursEntry, WorkingHoursFieldProps } from "../model/types"
import { DAYS, PRESETS } from "../model/config"

// Дни недели

// Генерация временных слотов с шагом 30 минут
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
  // Добавляем 24:00 как опцию для конца дня
  slots.push({ value: 2400, label: "24:00" })
  return slots
}

const TIME_SLOTS = generateTimeSlots()

// Конвертация времени в формат отображения
const formatTime = (time: number): string => {
  if (time === 2400) return "24:00"
  const hours = Math.floor(time / 100)
  const minutes = time % 100
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`
}

// Валидация времени
const validateTimeRange = (start?: number, end?: number): string[] => {
  const errors: string[] = []
  if (start && end) {
    if (start >= end && end !== 2400) {
      errors.push("Время окончания должно быть позже времени начала")
    }
  }
  return errors
}

export const WorkingHoursField: React.FC<WorkingHoursFieldProps> = ({
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
  >({})

  // Инициализация расписания по дням
  useEffect(() => {
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

    setScheduleByDay(schedule)
  }, [field.value])

  // Обновление поля формы при изменении расписания
  const updateFieldValue = (
    newSchedule: Record<number, WorkingHoursEntry[]>
  ) => {
    const flatSchedule: WorkingHoursEntry[] = []
    Object.values(newSchedule).forEach((dayEntries) => {
      flatSchedule.push(...dayEntries)
    })
    field.onChange(flatSchedule)
  }

  // Добавление нового временного слота для дня
  const addTimeSlot = (day: number) => {
    const newSchedule = { ...scheduleByDay }
    if (!newSchedule[day]) newSchedule[day] = []

    newSchedule[day].push({
      day,
      starthours: 900,
      endhours: 1800,
      comment: "",
    })

    setScheduleByDay(newSchedule)
    updateFieldValue(newSchedule)
  }

  // Удаление временного слота
  const removeTimeSlot = (day: number, index: number) => {
    const newSchedule = { ...scheduleByDay }
    newSchedule[day].splice(index, 1)
    setScheduleByDay(newSchedule)
    updateFieldValue(newSchedule)
  }

  // Обновление временного слота
  const updateTimeSlot = (
    day: number,
    index: number,
    updates: Partial<WorkingHoursEntry>
  ) => {
    const newSchedule = { ...scheduleByDay }
    newSchedule[day][index] = { ...newSchedule[day][index], ...updates }
    setScheduleByDay(newSchedule)
    updateFieldValue(newSchedule)
  }

  // Установка круглосуточного режима
  const setAllDay = (day: number, allDay: boolean) => {
    const newSchedule = { ...scheduleByDay }
    if (allDay) {
      newSchedule[day] = [{ day, all_day: true, comment: "" }]
    } else {
      newSchedule[day] = [{ day, starthours: 900, endhours: 1800, comment: "" }]
    }
    setScheduleByDay(newSchedule)
    updateFieldValue(newSchedule)
  }

  // Копирование расписания с предыдущего дня
  const copyFromPreviousDay = (day: number) => {
    const prevDay = day === 0 ? 6 : day - 1
    const newSchedule = { ...scheduleByDay }
    newSchedule[day] = scheduleByDay[prevDay].map((entry) => ({
      ...entry,
      day,
    }))
    setScheduleByDay(newSchedule)
    updateFieldValue(newSchedule)
  }

  // Применение предустановки
  const applyPreset = (preset: keyof typeof PRESETS) => {
    const newSchedule: Record<number, WorkingHoursEntry[]> = {}
    DAYS.forEach((day) => {
      newSchedule[day.value] = []
    })

    PRESETS[preset].hours.forEach((entry) => {
      if (!newSchedule[entry.day]) newSchedule[entry.day] = []
      newSchedule[entry.day].push(entry)
    })

    setScheduleByDay(newSchedule)
    updateFieldValue(newSchedule)
  }

  // Очистка всех данных
  const clearAll = () => {
    const newSchedule: Record<number, WorkingHoursEntry[]> = {}
    DAYS.forEach((day) => {
      newSchedule[day.value] = []
    })
    setScheduleByDay(newSchedule)
    updateFieldValue(newSchedule)
  }

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="space-y-4">
          {/* Панель управления */}
          <div className="flex flex-col gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Быстрые действия</h4>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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

          {/* Расписание по дням */}
          <div className="space-y-3">
            {DAYS.map((day) => {
              const dayEntries = scheduleByDay[day.value] || []
              const hasEntries = dayEntries.length > 0

              return (
                <div
                  key={day.value}
                  className="border rounded-lg p-4 space-y-3"
                >
                  {/* Заголовок дня */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Label className="font-medium min-w-0">
                        <span className="hidden sm:inline">{day.label}</span>
                        <span className="sm:hidden">{day.short}</span>
                      </Label>
                      {day.value > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => copyFromPreviousDay(day.value)}
                          className="text-xs h-6 px-2"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Как вчера</span>
                          <span className="sm:hidden">Копировать</span>
                        </Button>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setAllDay(day.value, true)}
                        className="text-xs h-6 px-2"
                      >
                        24/7
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addTimeSlot(day.value)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Временные слоты */}
                  {hasEntries ? (
                    <div className="space-y-2">
                      {dayEntries.map((entry, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row gap-2 p-3 bg-muted/20 rounded-md"
                        >
                          {entry.all_day ? (
                            <div className="flex items-center justify-between flex-1">
                              <span className="text-sm font-medium text-green-600">
                                Круглосуточно
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setAllDay(day.value, false)}
                                className="h-6 w-6 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              {/* Время */}
                              <div className="flex items-center gap-2 flex-1">
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

                                <span className="text-xs text-muted-foreground">
                                  до
                                </span>

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

                              {/* Комментарий и действия */}
                              <div className="flex items-center gap-2 sm:max-w-xs">
                                <Input
                                  placeholder="Комментарий"
                                  value={entry.comment || ""}
                                  onChange={(e) =>
                                    updateTimeSlot(day.value, index, {
                                      comment: e.target.value,
                                    })
                                  }
                                  className="h-8 text-xs"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeTimeSlot(day.value, index)
                                  }
                                  className="h-6 w-6 p-0 text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>

                              {/* Валидация */}
                              {(() => {
                                const errors = validateTimeRange(
                                  entry.starthours,
                                  entry.endhours
                                )
                                return errors.length > 0 ? (
                                  <div className="w-full text-xs text-destructive mt-1">
                                    {errors.join(", ")}
                                  </div>
                                ) : null
                              })()}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      Выходной
                    </div>
                  )}
                </div>
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

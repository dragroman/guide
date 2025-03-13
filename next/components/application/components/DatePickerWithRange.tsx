"use client"

import * as React from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Определяем тип для диапазона дат, используемый библиотекой react-day-picker
interface ZodDateRange {
  from?: Date | null | undefined
  to?: Date | null | undefined
}

interface DatePickerWithRangeProps {
  value: ZodDateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
  className?: string
}

export function DatePickerWithRange({
  value,
  onDateChange,
  className,
}: DatePickerWithRangeProps) {
  // Преобразуем наш тип даты в тип DateRange для компонента календаря
  const selectedRange: DateRange | undefined =
    value && value.from
      ? {
          from: value.from,
          to: value.to || undefined,
        }
      : undefined

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "dd.MM.yyyy", { locale: ru })} -{" "}
                  {format(value.to, "dd.MM.yyyy", { locale: ru })}
                </>
              ) : (
                format(value.from, "dd.MM.yyyy", { locale: ru })
              )
            ) : (
              <span>Выберите даты</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from || undefined}
            selected={selectedRange}
            onSelect={onDateChange} // Передаем выбранные даты обратно
            numberOfMonths={2}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

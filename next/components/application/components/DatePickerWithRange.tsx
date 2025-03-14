"use client"

import * as React from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, CheckCircle, X } from "lucide-react"
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
  error?: boolean
}

export function DatePickerWithRange({
  value,
  onDateChange,
  className,
  error,
}: DatePickerWithRangeProps) {
  // Состояние для управления popover
  const [open, setOpen] = React.useState(false)

  // Временное состояние для выбора даты
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(
    value && value.from
      ? {
          from: value.from,
          to: value.to || undefined,
        }
      : undefined
  )

  // При изменении value обновляем временный диапазон
  React.useEffect(() => {
    if (value && value.from) {
      setTempRange({
        from: value.from,
        to: value.to || undefined,
      })
    } else {
      setTempRange(undefined)
    }
  }, [value])

  // Преобразуем наш тип даты в тип DateRange для компонента календаря
  const selectedRange: DateRange | undefined =
    value && value.from
      ? {
          from: value.from,
          to: value.to || undefined,
        }
      : undefined

  // Обработчик временного выбора даты (без сохранения)
  const handleRangeChange = (range: DateRange | undefined) => {
    setTempRange(range)
  }

  // Обработчик применения выбранного диапазона
  const handleApply = () => {
    onDateChange(tempRange)
    setOpen(false)
  }

  // Обработчик очистки даты
  const handleClear = () => {
    setTempRange(undefined)
    onDateChange(undefined)
    setOpen(false)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value?.from && "text-muted-foreground",
              error && "border-destructive"
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
          <div className="p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value?.from || tempRange?.from || undefined}
              selected={tempRange}
              onSelect={handleRangeChange}
              numberOfMonths={2}
              locale={ru}
            />
            <div className="flex items-center justify-between p-3 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                type="button"
                className="text-destructive hover:text-destructive/90"
              >
                <X className="mr-2 h-4 w-4" />
                Очистить
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleApply}
                type="button"
                disabled={!tempRange?.from || !tempRange?.to}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Выбрать
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

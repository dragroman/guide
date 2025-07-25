"use client"

import * as React from "react"
import { format, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, CheckCircle, X } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@shared/lib/utils"
import { Button, buttonVariants } from "@shared/ui/button"
import { Calendar } from "@shared/ui/calendar"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@shared/ui/drawer"
import { getDaysText } from "@shared/lib/utils"

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
  // Состояние для управления открытием/закрытием
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

  // Обработчик временного выбора даты (без сохранения)
  const handleRangeChange = (range: DateRange | undefined) => {
    setTempRange(range)
  }

  // Обработчик применения выбранного диапазона
  const handleApply = () => {
    onDateChange(tempRange)
    setOpen(false)
  }

  // Обработчик очистки даты - не закрываем Drawer
  const handleClear = () => {
    setTempRange(undefined)
    onDateChange(undefined)
    // Не закрываем Drawer - убрали setOpen(false)
  }

  // Отображение выбранных дат или плейсхолдер
  const displayDates = value?.from
    ? value.to
      ? `${format(value.from, "dd.MM.yyyy", { locale: ru })} - ${format(value.to, "dd.MM.yyyy", { locale: ru })}`
      : format(value.from, "dd.MM.yyyy", { locale: ru })
    : "Выберите даты"

  // Текущая дата для запрета выбора прошедших дат
  const today = new Date()

  return (
    <div className={cn("grid gap-2", className)}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            id="date"
            size={"lg"}
            variant={"outline"}
            className={cn(
              !value?.from && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{displayDates}</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="border-b">
            <DrawerTitle>Выберите даты поездки</DrawerTitle>
            {tempRange?.from && tempRange?.to && (
              <div className="text-center text-sm text-muted-foreground">
                {(() => {
                  const daysCount =
                    differenceInDays(tempRange.to, tempRange.from) + 1
                  return `Длительность: ${daysCount} ${getDaysText(daysCount)}`
                })()}
              </div>
            )}
          </DrawerHeader>

          <div className="px-4 py-2 flex flex-col items-center">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value?.from || tempRange?.from || undefined}
              selected={tempRange}
              onSelect={handleRangeChange}
              numberOfMonths={2}
              locale={ru}
              disabled={{ before: today }}
              className="p-0"
              classNames={{
                day: cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-6 w-10 p-0 font-normal aria-selected:opacity-100"
                ),
              }}
            />

            <div className="w-full">
              <div className="flex items-center justify-between w-full mt-2 p-3 border-t border-border">
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
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

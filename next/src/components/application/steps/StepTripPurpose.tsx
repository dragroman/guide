import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from "../components/DatePickerWithRange"
import { StepProps } from "../types"
import { getDaysText } from "../utils"
import { DateRange as RDPDateRange } from "react-day-picker"
import {
  Briefcase,
  Building2,
  PlusCircle,
  ScanHeart,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react"
import { CardSelector, CardOption } from "../components/CardSelector"

export function StepTripPurpose({
  control,
  errors,
  formData,
  handleDateChange,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
  // Определяем массив опций для целей поездки
  const purposeOptions: CardOption[] = [
    {
      name: "excursion",
      label: "История и культура",
      description: "музеи, архитектура, знаковые места",
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      name: "business",
      label: "Деловая поездка",
      description: "Конференции, встречи, работа ",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      name: "shopping",
      label: "Шоппинг и сувениры",
      description: "Торговые центры, рынки, местные товары",
      icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
      name: "food",
      label: "Гастрономия",
      description: "Местная кухня, рестораны, уличная еда, дегустации",
      icon: <UtensilsCrossed className="h-6 w-6" />,
    },
    {
      name: "fun",
      label: "Развлечения и события",
      description: "Парки, мероприятия, вечеринки",
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      name: "health",
      label: "Оздоровление и релакс",
      description: "Массажи, спа-центры, стоматология, косметология",
      icon: <ScanHeart className="h-6 w-6" />,
    },
    {
      name: "other",
      label: "Другое",
      description: "Что-то другое? Расскажи нам!",
      icon: <PlusCircle className="h-6 w-6" />,
    },
  ]

  // Адаптер для работы с новой структурой данных
  const handlePurposeOptionChange = (name: string, checked: boolean) => {
    if (handleOptionChange) {
      handleOptionChange("trip.purpose.options", name, checked)
    }
  }

  const handlePurposeTextChange = (value: string) => {
    if (handleTextChange) {
      handleTextChange("trip.purpose", value)
    }
  }

  // Адаптер для DatePickerWithRange
  const handleDateRangeChange = (range: RDPDateRange | undefined) => {
    if (handleDateChange) {
      handleDateChange(range)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Когда и зачем?</h1>
      {/* Календарь */}
      <div className="space-y-4">
        <Label htmlFor="dateRange" className="text-lg">
          Предполагаемые даты поездки *
        </Label>
        <Controller
          name="trip.dateRange"
          control={control}
          render={({ field }) => (
            <DatePickerWithRange
              value={field.value}
              onDateChange={handleDateRangeChange}
              className="w-full"
              error={Boolean(errors.trip?.dateRange)}
            />
          )}
        />
        {formData.trip.daysCount && (
          <div className="text-sm">
            <Badge variant="outline">
              Продолжительность: {formData.trip.daysCount}{" "}
              {getDaysText(formData.trip.daysCount)}
            </Badge>
          </div>
        )}
        {/* Улучшенный вывод ошибок для дат */}
        {errors.trip?.dateRange && (
          <p className="text-sm font-medium text-destructive">
            {typeof errors.trip.dateRange === "string"
              ? errors.trip.dateRange
              : errors.trip.dateRange.message
                ? errors.trip.dateRange.message
                : errors.trip.dateRange.from
                  ? errors.trip.dateRange.from.message
                  : errors.trip.dateRange.to
                    ? errors.trip.dateRange.to.message
                    : "Пожалуйста, выберите даты поездки"}
          </p>
        )}
      </div>

      {/* Цель поездки */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">
            Что приносит вам удовольствие в путешествии?
          </h3>
          <div className="text-xs text-muted-foreground">
            (можно выбрать несколько)
          </div>
        </div>

        {/* Обновленный путь для CardSelector */}
        <CardSelector
          options={purposeOptions}
          formData={formData}
          path="trip.purpose.options" // Новый путь к опциям
          onOptionChange={handlePurposeOptionChange}
          iconClassName={(_, isChecked) =>
            isChecked ? "bg-primary text-primary-foreground" : "bg-muted"
          }
        />

        {/* Ошибка при отсутствии выбора */}
        {errors.trip?.purpose?.options && (
          <p className="text-sm font-medium text-destructive mt-2">
            {typeof errors.trip.purpose.options === "string"
              ? errors.trip.purpose.options
              : "Выберите хотя бы одну цель поездки"}
          </p>
        )}

        {/* Поле для ввода собственного варианта */}
        {formData.trip.purpose.options.other && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="otherDescription">Опишите вашу цель</Label>
            <Controller
              name="trip.purpose.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="otherDescription"
                  placeholder="Расскажите подробнее о вашей цели поездки"
                  {...field}
                  className={
                    errors.trip?.purpose?.otherDescription
                      ? "border-destructive"
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(e)
                    handlePurposeTextChange(e.target.value)
                  }}
                />
              )}
            />
            {errors.trip?.purpose?.otherDescription && (
              <p className="text-sm font-medium text-destructive">
                {errors.trip.purpose.otherDescription.message as string}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

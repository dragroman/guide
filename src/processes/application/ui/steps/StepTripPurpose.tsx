import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@shared/ui/label"
import { Textarea } from "@shared/ui/textarea"
import { Badge } from "@shared/ui/badge"
import { DatePickerWithRange } from "../DatePickerWithRange"
import { StepProps } from "../../model/types"
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
import { CardSelector, CardOption } from "../CardSelector"
import texts, { getDaysText } from "../../localization/ru"

export function StepTripPurpose({
  control,
  errors,
  formData,
  handleDateChange,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
  const t = texts.tripPurpose // Получаем тексты для этого компонента

  // Определяем массив опций для целей поездки на основе локализации
  const purposeOptions: CardOption[] = [
    {
      name: "excursion",
      label: t.options.excursion.label,
      description: t.options.excursion.description,
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      name: "business",
      label: t.options.business.label,
      description: t.options.business.description,
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      name: "shopping",
      label: t.options.shopping.label,
      description: t.options.shopping.description,
      icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
      name: "food",
      label: t.options.food.label,
      description: t.options.food.description,
      icon: <UtensilsCrossed className="h-6 w-6" />,
    },
    {
      name: "fun",
      label: t.options.fun.label,
      description: t.options.fun.description,
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      name: "health",
      label: t.options.health.label,
      description: t.options.health.description,
      icon: <ScanHeart className="h-6 w-6" />,
    },
    {
      name: "other",
      label: t.options.other.label,
      description: t.options.other.description,
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
      <h1 className="text-3xl font-bold">{t.title}</h1>
      {/* Календарь */}
      <div className="space-y-4">
        <Label htmlFor="dateRange" className="text-lg">
          {t.dateRangeLabel}
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
              {t.duration}: {formData.trip.daysCount}{" "}
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
                    : texts.errors.dateRequired}
          </p>
        )}
      </div>

      {/* Цель поездки */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{t.purposeQuestion}</h3>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectMultiple}
          </div>
        </div>

        {/* Ошибка при отсутствии выбора */}
        {errors.trip?.purpose?.options && (
          <p className="text-sm font-medium text-destructive mt-2">
            {typeof errors.trip.purpose.options === "string"
              ? errors.trip.purpose.options
              : texts.errors.purposeRequired}
          </p>
        )}

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
        {/* Поле для ввода собственного варианта */}
        {formData.trip.purpose.options.other && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="otherDescription">{t.otherPurposeLabel}</Label>
            <Controller
              name="trip.purpose.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="otherDescription"
                  placeholder={t.otherPurposePlaceholder}
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
                {(errors.trip.purpose.otherDescription.message as string) ||
                  texts.errors.otherDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

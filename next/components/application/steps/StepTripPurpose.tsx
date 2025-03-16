import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from "../components/DatePickerWithRange"
import { StepProps } from "../types"
import { getDaysText } from "../utils"
import {
  Briefcase,
  Building2,
  Check,
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
      label: "Экскурсии",
      description: "Музеи, исторические места",
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      name: "business",
      label: "Деловая поездка",
      description: "Бизнес-встречи, конференции",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      name: "shopping",
      label: "Шоппинг",
      description: "Магазины, рынки, сувениры",
      icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
      name: "food",
      label: "Гастрономия",
      description: "Местная кухня, рестораны",
      icon: <UtensilsCrossed className="h-6 w-6" />,
    },
    {
      name: "fun",
      label: "Развлечения",
      description: "Парки, мероприятия",
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      name: "health",
      label: "Оздоровление",
      description: "Массажи, спа-центры, стоматология, косметология",
      icon: <ScanHeart className="h-6 w-6" />,
    },
    {
      name: "other",
      label: "Другое",
      description: "Свой вариант",
      icon: <PlusCircle className="h-6 w-6" />,
    },
  ]

  // Используем универсальные обработчики, делегируя им конкретные пути
  const handlePurposeOptionChange = (name: string, checked: boolean) => {
    handleOptionChange?.("tripPurpose", name, checked)
  }

  const handlePurposeTextChange = (value: string) => {
    handleTextChange?.("tripPurpose", value)
  }

  return (
    <div className="space-y-10">
      {/* Календарь */}
      <div className="space-y-4">
        <Label htmlFor="dateRange">Предполагаемые даты поездки *</Label>
        <Controller
          name="dateRange"
          control={control}
          render={({ field }) => (
            <DatePickerWithRange
              value={field.value}
              onDateChange={handleDateChange!}
              className="w-full"
              error={Boolean(errors.dateRange)}
            />
          )}
        />
        {formData.daysCount && (
          <div className="mt-2 text-sm">
            <Badge variant="outline">
              Продолжительность: {formData.daysCount}{" "}
              {getDaysText(formData.daysCount)}
            </Badge>
          </div>
        )}
        {/* Улучшенный вывод ошибок для дат */}
        {errors.dateRange && (
          <p className="text-sm font-medium text-destructive">
            {typeof errors.dateRange === "string"
              ? errors.dateRange
              : errors.dateRange.message
                ? errors.dateRange.message
                : errors.dateRange.from
                  ? errors.dateRange.from.message
                  : errors.dateRange.to
                    ? errors.dateRange.to.message
                    : "Пожалуйста, выберите даты поездки"}
          </p>
        )}
      </div>

      {/* Цель поездки */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Выберите цели поездки
        </h3>

        {/* Заменяем блок с карточками на универсальный компонент CardSelector */}
        <CardSelector
          options={purposeOptions}
          formData={formData}
          path="tripPurpose"
          onOptionChange={handlePurposeOptionChange}
          // Кастомизация иконок (аналогично оригинальному компоненту)
          iconClassName={(_, isChecked) =>
            isChecked ? "bg-primary text-primary-foreground" : "bg-muted"
          }
        />

        {/* Ошибка при отсутствии выбора */}
        {errors.tripPurpose && !errors.tripPurpose.otherDescription && (
          <p className="text-sm font-medium text-destructive mt-2">
            {typeof errors.tripPurpose === "string"
              ? errors.tripPurpose
              : errors.tripPurpose.message ||
                "Выберите хотя бы одну цель поездки"}
          </p>
        )}

        {/* Поле для ввода собственного варианта */}
        {formData.tripPurpose.other && (
          <div className="space-y-2 mt-4">
            <Label htmlFor="otherDescription">Опишите вашу цель</Label>
            <Controller
              name="tripPurpose.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="otherDescription"
                  placeholder="Расскажите подробнее о вашей цели поездки"
                  {...field}
                  className={
                    errors.tripPurpose?.otherDescription
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
            {errors.tripPurpose?.otherDescription && (
              <p className="text-sm font-medium text-destructive">
                {errors.tripPurpose.otherDescription.message as string}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

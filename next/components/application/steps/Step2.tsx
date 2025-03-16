import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from "../components/DatePickerWithRange"
import { PurposeCheckbox } from "../components/PurposeCheckbox"
import { StepProps } from "../types"
import { getDaysText } from "../utils"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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

export function StepTripPurpose({
  control,
  errors,
  formData,
  setValue,
  handleDateChange,
  handlePurposeChange,
  handlePurposeTextChange,
}: StepProps) {
  const purposes = [
    {
      name: "excursion",
      label: "",
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
  // Проверяем, что необходимые пропсы присутствуют
  if (!handleDateChange || !handlePurposeChange || !handlePurposeTextChange) {
    console.error("Missing required props in StepTripPurpose")
    return <div>Error: Missing required handlers</div>
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
              onDateChange={handleDateChange}
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

        <div className="grid grid-cols-2 gap-3">
          {purposes.map((purpose) => {
            const isChecked =
              formData.tripPurpose[
                purpose.name as keyof typeof formData.tripPurpose
              ]

            return (
              <Card
                key={purpose.name}
                className={`cursor-pointer transition-all ${
                  isChecked
                    ? "border-primary ring-2 ring-primary"
                    : "hover:border-primary/50"
                }`}
                onClick={() => handlePurposeChange(purpose.name, !isChecked)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-start">
                    <div
                      className={`p-2 rounded-full mb-2 ${
                        isChecked
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {purpose.icon}
                    </div>
                    <p className="font-medium">{purpose.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {purpose.description}
                    </p>
                    {isChecked && (
                      <div className="absolute top-2 right-2 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

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

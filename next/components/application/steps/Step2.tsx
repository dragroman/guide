import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DatePickerWithRange } from "../components/DatePickerWithRange"
import { PurposeCheckbox } from "../components/PurposeCheckbox"
import { StepProps } from "../types"
import { getDaysText } from "../utils"

export function StepTripPurpose({
  control,
  errors,
  formData,
  setValue,
  handleDateChange,
  handlePurposeChange,
}: StepProps) {
  // Проверяем, что необходимые пропсы присутствуют
  if (!handleDateChange || !handlePurposeChange) {
    console.error("Missing required props in StepTripPurpose")
    return <div>Error: Missing required handlers</div>
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
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
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Выберите цель поездки *</h3>
        <div className="space-y-3">
          <PurposeCheckbox
            label="Экскурсии"
            name="excursion"
            checked={formData.tripPurpose.excursion}
            onChange={handlePurposeChange}
          />
          <PurposeCheckbox
            label="Деловая поездка"
            name="business"
            checked={formData.tripPurpose.business}
            onChange={handlePurposeChange}
          />
          <PurposeCheckbox
            label="Шоппинг"
            name="shopping"
            checked={formData.tripPurpose.shopping}
            onChange={handlePurposeChange}
          />
          <PurposeCheckbox
            label="Гастрономический туризм"
            name="food"
            checked={formData.tripPurpose.food}
            onChange={handlePurposeChange}
          />
          <PurposeCheckbox
            label="Развлечения"
            name="fun"
            checked={formData.tripPurpose.fun}
            onChange={handlePurposeChange}
          />
          <PurposeCheckbox
            label="Другое"
            name="other"
            checked={formData.tripPurpose.other}
            onChange={handlePurposeChange}
          />
        </div>
        {/* Ошибка для обязательного выбора цели поездки */}
        {errors.tripPurpose && !errors.tripPurpose.otherDescription && (
          <p className="text-sm font-medium text-destructive mt-2">
            {typeof errors.tripPurpose === "string"
              ? errors.tripPurpose
              : errors.tripPurpose.message ||
                "Выберите хотя бы одну цель поездки"}
          </p>
        )}
      </div>

      {formData.tripPurpose.other && (
        <div className="space-y-2">
          <Label htmlFor="otherDescription">Опишите вашу цель *</Label>
          <Controller
            name="tripPurpose.otherDescription"
            control={control}
            render={({ field }) => (
              <Textarea
                id="otherDescription"
                placeholder="Опишите вашу цель поездки"
                {...field}
                className={
                  errors.tripPurpose?.otherDescription
                    ? "border-destructive"
                    : ""
                }
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
  )
}

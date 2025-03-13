import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TripDatesStepProps, TripPurposeStepProps } from "../types"
import { PurposeCheckbox } from "../components/PurposeCheckbox"
import { DatePickerWithRange } from "../components/DatePickerWithRange"
import { Badge } from "@/components/ui/badge"
import { getDaysText } from "../utils"

export function StepTripPurpose({
  formData,
  errors,
  handlePurposeChange,
  handlePurposeTextChange,
  handleDateChange,
}: TripPurposeStepProps & TripDatesStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dateRange">Предполагаемые даты поездки *</Label>
          <DatePickerWithRange
            value={formData.dateRange}
            onDateChange={(date) =>
              date !== undefined && handleDateChange(date)
            }
            className="w-full"
          />
          {formData.daysCount && (
            <div className="mt-2 text-sm">
              <Badge variant="outline">
                Продолжительность: {formData.daysCount}{" "}
                {getDaysText(formData.daysCount)}
              </Badge>
            </div>
          )}
          {errors["dateRange.from"] && (
            <p className="text-sm font-medium text-destructive">
              {errors["dateRange.from"]}
            </p>
          )}
          {errors["dateRange.to"] && (
            <p className="text-sm font-medium text-destructive">
              {errors["dateRange.to"]}
            </p>
          )}
          {errors.dateRange && (
            <p className="text-sm font-medium text-destructive">
              {errors.dateRange}
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium">Выберите цель поездки</h3>
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
      </div>

      {formData.tripPurpose.other && (
        <div className="space-y-2">
          <Label htmlFor="otherDescription">Опишите вашу цель</Label>
          <Textarea
            id="otherDescription"
            name="otherDescription"
            value={formData.tripPurpose.otherDescription}
            onChange={(e) => handlePurposeTextChange(e.target.value)}
            placeholder="Опишите вашу цель поездки"
          />
          {errors["tripPurpose.otherDescription"] && (
            <p className="text-sm font-medium text-destructive">
              {errors["tripPurpose.otherDescription"]}
            </p>
          )}
        </div>
      )}

      {errors.tripPurpose && (
        <p className="text-sm font-medium text-destructive">
          {errors.tripPurpose}
        </p>
      )}
    </div>
  )
}

import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckboxField } from "../components/CheckboxField"
import { StepProps } from "../types"
import { Controller } from "react-hook-form"

export function StepAccommodation({
  control,
  errors,
  formData,
  handleAccommodationChange,
  handlePreferenceChange,
}: StepProps) {
  // Проверяем, что необходимые пропсы присутствуют
  if (!handleAccommodationChange || !handlePreferenceChange) {
    console.error("Missing required props in StepAccommodation")
    return <div>Error: Missing required handlers</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">
          Предпочитаемый тип размещения
        </h3>
        <div className="space-y-3">
          <CheckboxField
            label="Отель 3★"
            name="hotel3"
            checked={formData.accommodation.hotel3}
            onChange={handleAccommodationChange}
          />
          <CheckboxField
            label="Отель 4★"
            name="hotel4"
            checked={formData.accommodation.hotel4}
            onChange={handleAccommodationChange}
          />
          <CheckboxField
            label="Отель 5★"
            name="hotel5"
            checked={formData.accommodation.hotel5}
            onChange={handleAccommodationChange}
          />
          <CheckboxField
            label="Апартаменты"
            name="apartment"
            checked={formData.accommodation.apartment}
            onChange={handleAccommodationChange}
          />
          <CheckboxField
            label="Хостел"
            name="hostel"
            checked={formData.accommodation.hostel}
            onChange={handleAccommodationChange}
          />
          <CheckboxField
            label="Другое"
            name="other"
            checked={formData.accommodation.other}
            onChange={handleAccommodationChange}
          />
        </div>

        {formData.accommodation.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="accommodationOtherDescription">
              Укажите предпочтения
            </Label>
            <Controller
              name="accommodation.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="accommodationOtherDescription"
                  placeholder="Опишите предпочитаемый тип размещения"
                  {...field}
                  value={field.value || ""}
                />
              )}
            />
            {errors.accommodation?.otherDescription && (
              <p className="text-sm font-medium text-destructive">
                {errors.accommodation.otherDescription.message as string}
              </p>
            )}
          </div>
        )}

        {errors.accommodation &&
          !(errors.accommodation as any).otherDescription && (
            <p className="text-sm font-medium text-destructive mt-2">
              {typeof errors.accommodation === "string"
                ? errors.accommodation
                : (errors.accommodation.message as string)}
            </p>
          )}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Пожелания к размещению</h3>
        <div className="space-y-3">
          <CheckboxField
            label="Близость к центру города"
            name="centralLocation"
            checked={formData.accommodationPreferences.centralLocation}
            onChange={handlePreferenceChange}
          />
          <CheckboxField
            label="Близость к торговым центрам"
            name="nearShoppingCenters"
            checked={formData.accommodationPreferences.nearShoppingCenters}
            onChange={handlePreferenceChange}
          />
          <CheckboxField
            label="Наличие бассейна, спа, фитнеса"
            name="poolAndSpa"
            checked={formData.accommodationPreferences.poolAndSpa}
            onChange={handlePreferenceChange}
          />
        </div>

        {errors.accommodationPreferences && (
          <p className="text-sm font-medium text-destructive mt-2">
            {typeof errors.accommodationPreferences === "string"
              ? errors.accommodationPreferences
              : (errors.accommodationPreferences.message as string)}
          </p>
        )}
      </div>
    </div>
  )
}

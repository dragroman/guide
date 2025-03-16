import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StepProps } from "../types"
import { Controller } from "react-hook-form"
import { AccommodationCardSelector } from "../components/AccomodationCardSelector"
import { PreferencesCardSelector } from "../components/PreferencesCardSelector"

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

        {/* Используем новый компонент с карточками вместо чекбоксов */}
        <AccommodationCardSelector
          formData={formData}
          handleAccommodationChange={handleAccommodationChange}
        />

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
                  className={
                    errors.accommodation?.otherDescription
                      ? "border-destructive"
                      : ""
                  }
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

        {/* Ошибка валидации типа размещения */}
        {errors.accommodation &&
          typeof errors.accommodation === "object" &&
          !errors.accommodation.otherDescription && (
            <p className="text-sm font-medium text-destructive mt-2">
              {errors.accommodation.message}
            </p>
          )}

        {/* Ошибка валидации, если в схеме указан строковый формат ошибки */}
        {errors.accommodation && typeof errors.accommodation === "string" && (
          <p className="text-sm font-medium text-destructive mt-2">
            {errors.accommodation}
          </p>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Пожелания к размещению</h3>

        {/* Используем новый компонент с карточками для предпочтений */}
        <PreferencesCardSelector
          formData={formData}
          handlePreferenceChange={handlePreferenceChange}
        />

        {formData.accommodationPreferences.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="preferencesOtherDescription">
              Укажите ваши пожелания
            </Label>
            <Controller
              name="accommodationPreferences.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="preferencesOtherDescription"
                  placeholder="Опишите ваши пожелания к размещению"
                  {...field}
                  value={field.value || ""}
                  className={
                    errors.accommodationPreferences?.otherDescription
                      ? "border-destructive"
                      : ""
                  }
                />
              )}
            />
            {errors.accommodationPreferences?.otherDescription && (
              <p className="text-sm font-medium text-destructive">
                {
                  errors.accommodationPreferences.otherDescription
                    .message as string
                }
              </p>
            )}
          </div>
        )}

        {errors.accommodationPreferences &&
          typeof errors.accommodationPreferences === "object" &&
          !errors.accommodationPreferences.otherDescription && (
            <p className="text-sm font-medium text-destructive mt-2">
              {errors.accommodationPreferences.message}
            </p>
          )}

        {errors.accommodationPreferences &&
          typeof errors.accommodationPreferences === "string" && (
            <p className="text-sm font-medium text-destructive mt-2">
              {errors.accommodationPreferences}
            </p>
          )}
      </div>
    </div>
  )
}

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
            groupName="accommodation"
          />
          <CheckboxField
            label="Отель 4★"
            name="hotel4"
            checked={formData.accommodation.hotel4}
            onChange={handleAccommodationChange}
            groupName="accommodation"
          />
          <CheckboxField
            label="Отель 5★"
            name="hotel5"
            checked={formData.accommodation.hotel5}
            onChange={handleAccommodationChange}
            groupName="accommodation"
          />
          <CheckboxField
            label="Апартаменты"
            name="apartment"
            checked={formData.accommodation.apartment}
            onChange={handleAccommodationChange}
            groupName="accommodation"
          />
          <CheckboxField
            label="Хостел"
            name="hostel"
            checked={formData.accommodation.hostel}
            onChange={handleAccommodationChange}
            groupName="accommodation"
          />
          <CheckboxField
            label="Другое"
            name="other"
            checked={formData.accommodation.other}
            onChange={handleAccommodationChange}
            groupName="accommodation"
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
        <div className="space-y-3">
          <CheckboxField
            label="Близость к центру города"
            name="centralLocation"
            checked={formData.accommodationPreferences.centralLocation}
            onChange={handlePreferenceChange}
            groupName="preferences"
          />
          <CheckboxField
            label="Близость к торговым центрам"
            name="nearShoppingCenters"
            checked={formData.accommodationPreferences.nearShoppingCenters}
            onChange={handlePreferenceChange}
            groupName="preferences"
          />
          <CheckboxField
            label="Наличие бассейна, спа, фитнеса"
            name="poolAndSpa"
            checked={formData.accommodationPreferences.poolAndSpa}
            onChange={handlePreferenceChange}
            groupName="preferences"
          />
          <CheckboxField
            label="Другое"
            name="other"
            checked={formData.accommodationPreferences.other}
            onChange={handlePreferenceChange}
            groupName="preferences"
          />
        </div>

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

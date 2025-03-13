import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AccommodationStepProps } from "../types"
import { CheckboxField } from "../components/CheckboxField"

export function StepAccommodation({
  formData,
  errors,
  handleAccommodationChange,
  handleAccommodationTextChange,
  handlePreferenceChange,
  handlePreferenceTextChange,
}: AccommodationStepProps) {
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
            <Textarea
              id="accommodationOtherDescription"
              name="otherDescription"
              value={formData.accommodation.otherDescription}
              onChange={(e) => handleAccommodationTextChange(e.target.value)}
              placeholder="Опишите предпочитаемый тип размещения"
            />
            {errors["accommodation.otherDescription"] && (
              <p className="text-sm font-medium text-destructive">
                {errors["accommodation.otherDescription"]}
              </p>
            )}
          </div>
        )}

        {errors.accommodation && (
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
            {errors.accommodationPreferences}
          </p>
        )}
      </div>
    </div>
  )
}

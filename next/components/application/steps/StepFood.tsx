import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StepProps } from "../types"
import { Controller } from "react-hook-form"
import { CuisineCardSelector } from "../components/CuisineCardSelector"
import { FoodPreferencesCardSelector } from "../components/FoodPreferencesCardSelector"

export function StepFood({ control, errors, formData, setValue }: StepProps) {
  // Обработчик для выбора типа кухни
  const handleCuisineChange = (name: string, checked: boolean) => {
    const currentCuisine = formData.foodPreferences?.cuisine || {}

    const updatedCuisine = {
      ...currentCuisine,
      [name]: checked,
    }

    // Если снимаем галочку "Другое", очищаем описание
    if (name === "other" && !checked) {
      setValue("foodPreferences.cuisine.otherDescription", "")
    }

    setValue("foodPreferences.cuisine", updatedCuisine)

    // Если выбран хотя бы один тип кухни, снимаем ошибку
    const hasCuisine = Object.entries(updatedCuisine)
      .filter(([key]) => key !== "otherDescription")
      .some(([_, value]) => value === true)

    if (hasCuisine && errors?.foodPreferences?.cuisine) {
      setValue("foodPreferences.cuisine._error", undefined)
    }
  }

  // Обработчик для выбора предпочтений по питанию
  const handleFoodPreferenceChange = (name: string, checked: boolean) => {
    const currentPreferences = formData.foodPreferences?.preferences || {}

    const updatedPreferences = {
      ...currentPreferences,
      [name]: checked,
    }

    // Если снимаем галочку "Другое", очищаем описание
    if (name === "other" && !checked) {
      setValue("foodPreferences.preferences.otherDescription", "")
    }

    setValue("foodPreferences.preferences", updatedPreferences)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">Предпочтения по кухне</h3>

        <CuisineCardSelector
          formData={formData}
          handleCuisineChange={handleCuisineChange}
        />

        {formData.foodPreferences?.cuisine?.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="cuisineOtherDescription">
              Укажите ваши предпочтения по кухне
            </Label>
            <Controller
              name="foodPreferences.cuisine.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="cuisineOtherDescription"
                  placeholder="Опишите ваши предпочтения по кухне"
                  {...field}
                  value={field.value || ""}
                  className={
                    errors?.foodPreferences?.cuisine?.otherDescription
                      ? "border-destructive"
                      : ""
                  }
                />
              )}
            />
            {errors?.foodPreferences?.cuisine?.otherDescription && (
              <p className="text-sm font-medium text-destructive">
                {
                  errors.foodPreferences.cuisine.otherDescription
                    .message as string
                }
              </p>
            )}
          </div>
        )}

        {/* Ошибка валидации типа кухни */}
        {errors?.foodPreferences?.cuisine?._error && (
          <p className="text-sm font-medium text-destructive mt-2">
            {errors.foodPreferences.cuisine._error.message as string}
          </p>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">
          Дополнительная информация о питании
        </h3>

        <FoodPreferencesCardSelector
          formData={formData}
          handleFoodPreferenceChange={handleFoodPreferenceChange}
        />

        {formData.foodPreferences?.preferences?.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="foodPreferencesOtherDescription">
              Укажите особые требования к питанию
            </Label>
            <Controller
              name="foodPreferences.preferences.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="foodPreferencesOtherDescription"
                  placeholder="Опишите ваши диеты, аллергии или другие требования к питанию"
                  {...field}
                  value={field.value || ""}
                  className={
                    errors?.foodPreferences?.preferences?.otherDescription
                      ? "border-destructive"
                      : ""
                  }
                />
              )}
            />
            {errors?.foodPreferences?.preferences?.otherDescription && (
              <p className="text-sm font-medium text-destructive">
                {
                  errors.foodPreferences.preferences.otherDescription
                    .message as string
                }
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

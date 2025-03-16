import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StepProps } from "../types"
import { Controller } from "react-hook-form"
import { CardSelector, CardOption } from "../components/CardSelector"
import {
  Utensils,
  Coffee,
  Soup,
  Beef,
  Flame,
  Leaf,
  Star,
  AlertTriangle,
} from "lucide-react"
import { FlagComponent } from "../components/PhoneInput"
import { Country } from "react-phone-number-input"

export function StepFood({ control, errors, formData, setValue }: StepProps) {
  // Опции для типов кухни
  const cuisineOptions: CardOption[] = [
    {
      name: "chinese",
      label: "Китайская кухня",
      description: "Традиционные блюда разных регионов Китая",
      icon: <Utensils className="h-5 w-5" />,
      extraData: { country: "CN" },
    },
    {
      name: "european",
      label: "Европейская кухня",
      description: "Блюда из Италии, Франции и других стран Европы",
      icon: <Utensils className="h-5 w-5" />,
      extraData: { country: "EU" },
    },
    {
      name: "japanese",
      label: "Японская кухня",
      description: "Суши, роллы и другие традиционные блюда Японии",
      icon: <Soup className="h-5 w-5" />,
      extraData: { country: "JP" },
    },
    {
      name: "russian",
      label: "Русская кухня",
      description: "Традиционные русские блюда и закуски",
      icon: <Coffee className="h-5 w-5" />,
      extraData: { country: "RU" },
    },
    {
      name: "other",
      label: "Другое",
      description: "Другие национальные кухни и предпочтения",
      icon: <Utensils className="h-5 w-5" />,
    },
  ]

  // Опции для предпочтений по питанию
  const foodPreferencesOptions: CardOption[] = [
    {
      name: "tryLocal",
      label: "Местная кухня",
      description: "Хочу попробовать аутентичные местные блюда",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "spicyOk",
      label: "Острая пища",
      description: "Нормально переношу острую пищу",
      icon: <Flame className="h-5 w-5" />,
    },
    {
      name: "fattyOk",
      label: "Жирная пища",
      description: "Нормально переношу жирную пищу",
      icon: <Leaf className="h-5 w-5" />,
    },
    {
      name: "other",
      label: "Особые требования",
      description: "Диеты, аллергии или другие предпочтения",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
  ]

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
      .filter(([key]) => key !== "otherDescription" && key !== "_error")
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

  // Рендер флага страны для опций кухни
  const renderCuisineExtra = (option: CardOption) => {
    if (option.extraData?.country) {
      return (
        <div className="mt-1">
          <FlagComponent
            country={option.extraData.country as Country}
            countryName={option.label}
          />
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">Предпочтения по кухне</h3>

        {/* Используем CardSelector для типов кухни */}
        <CardSelector
          options={cuisineOptions}
          formData={formData}
          path="foodPreferences.cuisine"
          onOptionChange={handleCuisineChange}
          renderExtraContent={renderCuisineExtra}
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

        {/* Используем CardSelector для предпочтений по питанию */}
        <CardSelector
          options={foodPreferencesOptions}
          formData={formData}
          path="foodPreferences.preferences"
          onOptionChange={handleFoodPreferenceChange}
          iconClassName={(_, isChecked) =>
            isChecked ? "bg-primary text-primary-foreground" : "bg-muted"
          }
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

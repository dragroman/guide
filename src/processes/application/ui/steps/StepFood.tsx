import React from "react"
import { Label } from "@shared/ui/label"
import { Textarea } from "@shared/ui/textarea"
import { StepProps } from "../../model/types"
import { Controller } from "react-hook-form"
import { CardSelector, CardOption } from "../CardSelector"
import {
  Utensils,
  Coffee,
  Soup,
  Flame,
  Leaf,
  Star,
  AlertTriangle,
} from "lucide-react"
import { FlagComponent } from "../PhoneInput"
import { Country } from "react-phone-number-input"
import texts from "../../localization/ru"

export function StepFood({
  control,
  errors,
  formData,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
  const t = texts.food

  // Вспомогательные функции
  const getNestedValue = (obj: any, path: string) => {
    return path
      .split(".")
      .reduce((prev, curr) => (prev ? prev[curr] : undefined), obj)
  }

  const hasOptionsError = (path: string) => {
    const errorObj = getNestedValue(errors, path)
    return (
      errorObj &&
      typeof errorObj === "object" &&
      !errorObj.otherDescription &&
      (errorObj._error || errorObj.message)
    )
  }

  const hasOtherDescriptionError = (path: string) => {
    const errorPath = `${path}.otherDescription`
    return getNestedValue(errors, errorPath)
  }

  const getErrorMessage = (path: string): string => {
    const errorObj = getNestedValue(errors, path)

    if (!errorObj) return ""

    if (typeof errorObj === "string") {
      return errorObj
    }

    if (errorObj._error?.message) {
      return errorObj._error.message
    }

    if (errorObj.message) {
      return errorObj.message
    }

    return texts.errors.formError
  }

  const hasCuisineError = () => hasOptionsError("food.cuisine")
  const hasCuisineOtherError = () => hasOtherDescriptionError("food.cuisine")
  const hasPreferencesOtherError = () =>
    hasOtherDescriptionError("food.preferences")

  // Опции для типов кухни
  const cuisineOptions: CardOption[] = [
    {
      name: "chinese",
      label: t.cuisine.chinese.label,
      description: t.cuisine.chinese.description,
      icon: <Utensils className="h-5 w-5" />,
      extraData: { country: "CN" },
    },
    {
      name: "european",
      label: t.cuisine.european.label,
      description: t.cuisine.european.description,
      icon: <Utensils className="h-5 w-5" />,
      extraData: { country: "EU" },
    },
    {
      name: "japanese",
      label: t.cuisine.japanese.label,
      description: t.cuisine.japanese.description,
      icon: <Soup className="h-5 w-5" />,
      extraData: { country: "JP" },
    },
    {
      name: "russian",
      label: t.cuisine.russian.label,
      description: t.cuisine.russian.description,
      icon: <Coffee className="h-5 w-5" />,
      extraData: { country: "RU" },
    },
    {
      name: "other",
      label: t.cuisine.other.label,
      description: t.cuisine.other.description,
      icon: <Utensils className="h-5 w-5" />,
    },
  ]

  // Опции для предпочтений по питанию
  const foodPreferencesOptions: CardOption[] = [
    {
      name: "noSpicy",
      label: t.preferences.noSpicy.label,
      description: t.preferences.noSpicy.description,
    },
    {
      name: "noFatty",
      label: t.preferences.noFatty.label,
      description: t.preferences.noFatty.description,
    },
    {
      name: "vegetarian",
      label: t.preferences.vegetarian.label,
      description: t.preferences.vegetarian.description,
    },
    {
      name: "halal",
      label: t.preferences.halal.label,
      description: t.preferences.halal.description,
    },
    {
      name: "other",
      label: t.preferences.other.label,
      description: t.preferences.other.description,
    },
  ]

  // Обработчики
  const handleCuisineChange = (name: string, checked: boolean) => {
    handleOptionChange?.("food.cuisine", name, checked)
  }

  const handleCuisineTextChange = (value: string) => {
    handleTextChange?.("food.cuisine", value)
  }

  const handleFoodPreferenceChange = (name: string, checked: boolean) => {
    handleOptionChange?.("food.preferences", name, checked)
  }

  const handleFoodPreferenceTextChange = (value: string) => {
    handleTextChange?.("food.preferences", value)
  }

  // Рендер флага страны для опций кухни
  const renderCuisineExtra = (option: CardOption, isChecked: boolean) => {
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
    <div className="space-y-8">
      <h1>
        <span className="text-3xl font-bold">{t.title}</span>
        <span className="ml-2 text-sm text-muted-foreground">
          {t.optionalLabel}
        </span>
      </h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg">{t.cuisineQuestion}</h2>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectMultiple}
          </div>
        </div>

        <CardSelector
          options={cuisineOptions}
          formData={formData}
          path="food.cuisine"
          onOptionChange={handleCuisineChange}
          renderExtraContent={renderCuisineExtra}
        />

        {hasCuisineError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage("food.cuisine") || texts.errors.cuisineRequired}
          </p>
        )}

        {formData.food.cuisine.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="cuisineOtherDescription">
              {t.otherCuisineLabel}
            </Label>
            <Controller
              name="food.cuisine.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="cuisineOtherDescription"
                  placeholder={t.otherCuisinePlaceholder}
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e)
                    handleCuisineTextChange(e.target.value)
                  }}
                  className={hasCuisineOtherError() ? "border-destructive" : ""}
                />
              )}
            />
            {hasCuisineOtherError() && (
              <p className="text-sm font-medium text-destructive">
                {getErrorMessage("food.cuisine.otherDescription") ||
                  texts.errors.otherDescription}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg">{t.preferencesQuestion}</h2>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectMultiple}
          </div>
        </div>

        <CardSelector
          options={foodPreferencesOptions}
          formData={formData}
          path="food.preferences"
          onOptionChange={handleFoodPreferenceChange}
          iconClassName={(_, isChecked) =>
            isChecked ? "bg-primary text-primary-foreground" : "bg-muted"
          }
        />

        {formData.food.preferences.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="foodPreferencesOtherDescription">
              {t.otherPreferenceLabel}
            </Label>
            <Controller
              name="food.preferences.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="foodPreferencesOtherDescription"
                  placeholder={t.otherPreferencePlaceholder}
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e)
                    handleFoodPreferenceTextChange(e.target.value)
                  }}
                  className={
                    hasPreferencesOtherError() ? "border-destructive" : ""
                  }
                />
              )}
            />
            {hasPreferencesOtherError() && (
              <p className="text-sm font-medium text-destructive">
                {getErrorMessage("food.preferences.otherDescription") ||
                  texts.errors.otherDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

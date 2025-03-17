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
  Flame,
  Leaf,
  Star,
  AlertTriangle,
} from "lucide-react"
import { FlagComponent } from "../components/PhoneInput"
import { Country } from "react-phone-number-input"

export function StepFood({
  control,
  errors,
  formData,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
  // Вспомогательная функция для получения значения из вложенного объекта по строковому пути
  const getNestedValue = (obj: any, path: string) => {
    return path
      .split(".")
      .reduce((prev, curr) => (prev ? prev[curr] : undefined), obj)
  }

  // Проверка ошибки в группе опций (когда ничего не выбрано)
  const hasOptionsError = (path: string) => {
    const errorObj = getNestedValue(errors, path)
    return (
      errorObj &&
      typeof errorObj === "object" &&
      !errorObj.otherDescription &&
      (errorObj._error || errorObj.message)
    )
  }

  // Проверка ошибки в поле "другое"
  const hasOtherDescriptionError = (path: string) => {
    const errorPath = `${path}.otherDescription`
    return getNestedValue(errors, errorPath)
  }

  // Функция для получения текста ошибки
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

    return "Пожалуйста, проверьте введенные данные"
  }

  // Проверки наличия ошибок для конкретных полей
  const hasCuisineError = () => hasOptionsError("food.cuisine")
  const hasCuisineOtherError = () => hasOtherDescriptionError("food.cuisine")
  const hasPreferencesOtherError = () =>
    hasOtherDescriptionError("food.preferences")

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

  // Используем универсальные обработчики с новыми путями
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
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">Предпочтения по кухне</h3>

        {/* Используем CardSelector для типов кухни с обновленным путем */}
        <CardSelector
          options={cuisineOptions}
          formData={formData}
          path="food.cuisine"
          onOptionChange={handleCuisineChange}
          renderExtraContent={renderCuisineExtra}
        />

        {/* Ошибка валидации типа кухни */}
        {hasCuisineError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage("food.cuisine") ||
              "Выберите хотя бы один тип кухни"}
          </p>
        )}

        {formData.food.cuisine.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="cuisineOtherDescription">
              Укажите ваши предпочтения по кухне
            </Label>
            <Controller
              name="food.cuisine.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="cuisineOtherDescription"
                  placeholder="Опишите ваши предпочтения по кухне"
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
                  "Укажите описание для пункта 'Другое'"}
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">
          Дополнительная информация о питании
        </h3>

        {/* Используем CardSelector для предпочтений по питанию с обновленным путем */}
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
              Укажите особые требования к питанию
            </Label>
            <Controller
              name="food.preferences.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="foodPreferencesOtherDescription"
                  placeholder="Опишите ваши диеты, аллергии или другие требования к питанию"
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
                  "Укажите описание для пункта 'Другое'"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

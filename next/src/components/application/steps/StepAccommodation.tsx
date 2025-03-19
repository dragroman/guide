import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StepProps } from "../types"
import { Controller } from "react-hook-form"
import { CardSelector, CardOption } from "../components/CardSelector"
import {
  Home,
  Building,
  Warehouse,
  Star,
  MapPin,
  ShoppingBag,
  Dumbbell,
  Sparkles,
} from "lucide-react"
import {
  hasOptionsError,
  hasOtherDescriptionError,
  getErrorMessage,
} from "../utils/errorHelpers"
import texts from "../localization/ru"

export function StepAccommodation({
  control,
  errors,
  formData,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
  // Подгружаем тексты
  const t = texts.accommodation
  const option = t.options
  const preferences = t.preferences

  // Проверки наличия ошибок для конкретных полей
  const hasAccommodationOptionsError = () =>
    hasOptionsError(errors, "accommodation.options")
  const hasAccommodationOtherError = () =>
    hasOtherDescriptionError(errors, "accommodation.options")
  const hasPreferencesError = () =>
    hasOptionsError(errors, "accommodation.preferences")
  const hasPreferencesOtherError = () =>
    hasOtherDescriptionError(errors, "accommodation.preferences")

  // Опции для типов размещения
  const accommodationOptions: CardOption[] = [
    {
      name: "hotel3",
      label: option.hotel3.label,
      description: option.hotel3.description,
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "hotel4",
      label: option.hotel4.label,
      description: option.hotel4.description,
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "hotel5",
      label: option.hotel5.label,
      description: option.hotel5.description,
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "apartment",
      label: option.apartment.label,
      description: option.apartment.description,
      icon: <Building className="h-5 w-5" />,
    },
    {
      name: "hostel",
      label: option.hostel.label,
      description: option.hostel.description,
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "other",
      label: option.other.label,
      description: option.other.description,
      icon: <Warehouse className="h-5 w-5" />,
    },
  ]

  // Опции для предпочтений к размещению
  const preferencesOptions: CardOption[] = [
    {
      name: "centralLocation",
      label: preferences.centralLocation.label,
      description: preferences.centralLocation.description,
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      name: "nearShoppingCenters",
      label: preferences.nearShoppingCenters.label,
      description: preferences.nearShoppingCenters.description,
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "poolAndSpa",
      label: preferences.poolAndSpa.label,
      description: preferences.poolAndSpa.description,
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      name: "other",
      label: preferences.other.label,
      description: preferences.other.description,
      icon: <Sparkles className="h-5 w-5" />,
    },
  ]

  // Используем универсальные обработчики, делегируя им конкретные пути
  const handleAccommodationOptionChange = (name: string, checked: boolean) => {
    handleOptionChange?.("accommodation.options", name, checked)
  }

  const handleAccommodationTextChange = (value: string) => {
    handleTextChange?.("accommodation.options", value)
  }

  const handlePreferenceOptionChange = (name: string, checked: boolean) => {
    handleOptionChange?.("accommodation.preferences", name, checked)
  }

  const handlePreferenceTextChange = (value: string) => {
    handleTextChange?.("accommodation.preferences", value)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg">{t.question}</h2>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectMultiple}
          </div>
        </div>
        {hasAccommodationOptionsError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(
              errors,
              "accommodation.options",
              texts.errors.accommodationRequired
            )}
          </p>
        )}
        <CardSelector
          options={accommodationOptions}
          formData={formData}
          path="accommodation.options"
          onOptionChange={handleAccommodationOptionChange}
        />

        {formData.accommodation.options.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="accommodationOtherDescription">
              {texts.accommodation.otherLabel}
            </Label>
            <Controller
              name="accommodation.options.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="accommodationOtherDescription"
                  placeholder={texts.accommodation.otherPlaceholder}
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e)
                    handleAccommodationTextChange(e.target.value)
                  }}
                  className={
                    hasAccommodationOtherError() ? "border-destructive" : ""
                  }
                />
              )}
            />
            {hasAccommodationOtherError() && (
              <p className="text-sm font-medium text-destructive">
                {getErrorMessage(
                  errors,
                  "accommodation.options.otherDescription",
                  texts.errors.otherDescription
                )}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg">{texts.accommodation.preferenceQuestion}</h2>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectMultiple}
          </div>
        </div>
        {/* Обновленный путь для CardSelector предпочтений */}
        <CardSelector
          options={preferencesOptions}
          formData={formData}
          path="accommodation.preferences"
          onOptionChange={handlePreferenceOptionChange}
        />

        {/* Отображаем ошибку, если есть */}
        {hasPreferencesError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(
              errors,
              "accommodation.preferences",
              texts.errors.accommodationRequired
            )}
          </p>
        )}

        {formData.accommodation.preferences.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="preferencesOtherDescription">
              {texts.accommodation.preferenceOtherLabel}
            </Label>
            <Controller
              name="accommodation.preferences.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="preferencesOtherDescription"
                  placeholder={texts.accommodation.preferenceOtherPlaceholder}
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e)
                    handlePreferenceTextChange(e.target.value)
                  }}
                  className={
                    hasPreferencesOtherError() ? "border-destructive" : ""
                  }
                />
              )}
            />
            {hasPreferencesOtherError() && (
              <p className="text-sm font-medium text-destructive">
                {getErrorMessage(
                  errors,
                  "accommodation.preferences.otherDescription",
                  texts.errors.otherDescription
                )}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Общие ошибки для раздела accommodation */}
      {errors.accommodation && typeof errors.accommodation === "string" && (
        <p className="text-sm font-medium text-destructive mt-2">
          {errors.accommodation}
        </p>
      )}
    </div>
  )
}

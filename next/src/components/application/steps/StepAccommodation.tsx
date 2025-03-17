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

export function StepAccommodation({
  control,
  errors,
  formData,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
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
      label: "Отель 3★",
      description: "Комфортабельные номера с базовыми удобствами",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "hotel4",
      label: "Отель 4★",
      description: "Улучшенные номера с дополнительными услугами",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "hotel5",
      label: "Отель 5★",
      description: "Люксовые номера с полным спектром услуг",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "apartment",
      label: "Апартаменты",
      description: "Самостоятельное проживание с кухней и гостиной",
      icon: <Building className="h-5 w-5" />,
    },
    {
      name: "hostel",
      label: "Хостел",
      description: "Бюджетное размещение в общих номерах",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "other",
      label: "Другое",
      description: "Уточните ваши особые пожелания",
      icon: <Warehouse className="h-5 w-5" />,
    },
  ]

  // Опции для предпочтений к размещению
  const preferencesOptions: CardOption[] = [
    {
      name: "centralLocation",
      label: "Близость к центру",
      description: "Удобное расположение в центральной части города",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      name: "nearShoppingCenters",
      label: "Рядом с магазинами",
      description: "Близкое расположение к торговым центрам и рынкам",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "poolAndSpa",
      label: "Бассейн и спа",
      description: "Наличие бассейна, спа-зоны и фитнес-центра",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      name: "other",
      label: "Другое",
      description: "Другие особые пожелания к размещению",
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
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">
          Предпочитаемый тип размещения
        </h3>

        {/* Обновленный путь для CardSelector */}
        <CardSelector
          options={accommodationOptions}
          formData={formData}
          path="accommodation.options"
          onOptionChange={handleAccommodationOptionChange}
        />

        {/* Отображаем ошибку, если есть */}
        {hasAccommodationOptionsError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(errors, "accommodation.options") ||
              "Выберите хотя бы один тип размещения"}
          </p>
        )}

        {formData.accommodation.options.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="accommodationOtherDescription">
              Укажите предпочтения
            </Label>
            <Controller
              name="accommodation.options.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="accommodationOtherDescription"
                  placeholder="Опишите предпочитаемый тип размещения"
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
                  "accommodation.options.otherDescription"
                ) || "Укажите описание для пункта 'Другое'"}
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Пожелания к размещению</h3>

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
            {getErrorMessage(errors, "accommodation.preferences") ||
              "Выберите хотя бы одно предпочтение по размещению"}
          </p>
        )}

        {formData.accommodation.preferences.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="preferencesOtherDescription">
              Укажите ваши пожелания
            </Label>
            <Controller
              name="accommodation.preferences.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="preferencesOtherDescription"
                  placeholder="Опишите ваши пожелания к размещению"
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
                  "accommodation.preferences.otherDescription"
                ) || "Укажите описание для пункта 'Другое'"}
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

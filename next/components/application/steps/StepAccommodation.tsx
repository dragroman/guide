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
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">
          Предпочитаемый тип размещения
        </h3>

        {/* Используем CardSelector для типов размещения */}
        <CardSelector
          options={accommodationOptions}
          formData={formData}
          path="accommodation"
          onOptionChange={handleAccommodationChange}
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

        {/* Используем CardSelector для предпочтений к размещению */}
        <CardSelector
          options={preferencesOptions}
          formData={formData}
          path="accommodationPreferences"
          onOptionChange={handlePreferenceChange}
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

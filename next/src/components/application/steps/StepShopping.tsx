import React from "react"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StepProps } from "../types"
import { CardSelector, CardOption } from "../components/CardSelector"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ShoppingBag,
  ShoppingCart,
  PlusCircle,
  Clock,
  Clock1,
  Clock12,
  Package,
} from "lucide-react"
import {
  hasOptionsError,
  hasOtherDescriptionError,
  getErrorMessage,
} from "../utils/errorHelpers"
import texts from "../localization/ru"

export function StepShopping({
  control,
  errors,
  formData,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
  const t = texts.shopping

  // Проверки наличия ошибок для конкретных полей
  const hasBudgetError = () => hasOptionsError(errors, "shopping.budget")
  const hasShoppingPlacesError = () =>
    hasOptionsError(errors, "shopping.shoppingPlaces")
  const hasShoppingPlacesOtherError = () =>
    hasOtherDescriptionError(errors, "shopping.shoppingPlaces")
  const hasShoppingTimeError = () =>
    hasOptionsError(errors, "shopping.shoppingTime")

  // Опции для бюджета
  const budgetOptions: CardOption[] = [
    {
      name: "economy",
      label: t.budget.economy.label,
      description: t.budget.economy.description,
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "medium",
      label: t.budget.medium.label,
      description: t.budget.medium.description,
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "luxury",
      label: t.budget.luxury.label,
      description: t.budget.luxury.description,
      icon: <ShoppingBag className="h-5 w-5" />,
    },
  ]

  // Опции для мест шоппинга
  const shoppingPlacesOptions: CardOption[] = [
    {
      name: "malls",
      label: t.places.malls.label,
      description: t.places.malls.description,
    },
    {
      name: "boutiques",
      label: t.places.boutiques.label,
      description: t.places.boutiques.description,
    },
    {
      name: "markets",
      label: t.places.markets.label,
      description: t.places.markets.description,
    },
    {
      name: "outlets",
      label: t.places.outlets.label,
      description: t.places.outlets.description,
    },
    {
      name: "other",
      label: t.places.other.label,
      description: t.places.other.description,
    },
  ]

  // Опции для времени шоппинга
  const shoppingTimeOptions: CardOption[] = [
    {
      name: "fewHours",
      label: t.time.fewHours.label,
      description: t.time.fewHours.description,
      icon: <Clock className="h-5 w-5" />,
    },
    {
      name: "halfDay",
      label: t.time.halfDay.label,
      description: t.time.halfDay.description,
      icon: <Clock1 className="h-5 w-5" />,
    },
    {
      name: "fullDay",
      label: t.time.fullDay.label,
      description: t.time.fullDay.description,
      icon: <Clock12 className="h-5 w-5" />,
    },
  ]

  // Обработчики для бюджета - выбор только одного варианта
  const handleBudgetChange = (name: string, checked: boolean) => {
    if (checked) {
      budgetOptions.forEach((option) => {
        if (option.name !== name) {
          handleOptionChange?.("shopping.budget", option.name, false)
        }
      })
    }
    handleOptionChange?.("shopping.budget", name, checked)
  }

  // Обработчики для мест шоппинга
  const handleShoppingPlacesChange = (name: string, checked: boolean) => {
    handleOptionChange?.("shopping.shoppingPlaces", name, checked)
  }

  const handleShoppingPlacesTextChange = (value: string) => {
    handleTextChange?.("shopping.shoppingPlaces", value)
  }

  // Обработчики для времени шоппинга - выбор только одного варианта
  const handleShoppingTimeChange = (name: string, checked: boolean) => {
    if (checked) {
      shoppingTimeOptions.forEach((option) => {
        if (option.name !== name) {
          handleOptionChange?.("shopping.shoppingTime", option.name, false)
        }
      })
    }
    handleOptionChange?.("shopping.shoppingTime", name, checked)
  }

  // Обработчик для доставки
  const handleDeliveryChange = (checked: boolean) => {
    handleOptionChange?.("shopping.deliveryServices", "needed", checked)
  }

  return (
    <div className="space-y-8">
      <h1>
        <span className="text-3xl font-bold">{t.title}</span>
        <span className="ml-2 text-sm text-muted-foreground">
          {t.optionalLabel}
        </span>
      </h1>
      {/* Бюджет */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg">{t.budgetQuestion}</h2>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectOne}
          </div>
        </div>
        <div>
          <CardSelector
            options={budgetOptions}
            formData={formData}
            path="shopping.budget"
            onOptionChange={handleBudgetChange}
            className="grid grid-cols-3 md:grid-cols-3 gap-3"
          />
          {hasBudgetError() && (
            <p className="text-sm font-medium text-destructive mt-2">
              {getErrorMessage(
                errors,
                "shopping.budget",
                texts.errors.shoppingTimeRequired
              )}
            </p>
          )}
        </div>
      </div>

      {/* Места для шоппинга */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg">{t.placesQuestion}</h2>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectMultiple}
          </div>
        </div>
        <div>
          <CardSelector
            options={shoppingPlacesOptions}
            formData={formData}
            path="shopping.shoppingPlaces"
            onOptionChange={handleShoppingPlacesChange}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          />
          {hasShoppingPlacesError() && (
            <p className="text-sm font-medium text-destructive mt-2">
              {getErrorMessage(
                errors,
                "shopping.shoppingPlaces",
                texts.errors.shoppingPlacesRequired
              )}
            </p>
          )}
          {formData.shopping?.shoppingPlaces?.other && (
            <div className="space-y-2 mt-3">
              <Label htmlFor="shoppingPlacesOtherDescription">
                {t.otherPlacesLabel}
              </Label>
              <Controller
                name="shopping.shoppingPlaces.otherDescription"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="shoppingPlacesOtherDescription"
                    placeholder={t.otherPlacesPlaceholder}
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e)
                      handleShoppingPlacesTextChange(e.target.value)
                    }}
                    className={
                      hasShoppingPlacesOtherError() ? "border-destructive" : ""
                    }
                  />
                )}
              />
              {hasShoppingPlacesOtherError() && (
                <p className="text-sm font-medium text-destructive">
                  {getErrorMessage(
                    errors,
                    "shopping.shoppingPlaces.otherDescription",
                    texts.errors.otherDescription
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Время на шоппинг */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg">{t.timeQuestion}</h2>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectOne}
          </div>
        </div>
        <div>
          <CardSelector
            options={shoppingTimeOptions}
            formData={formData}
            path="shopping.shoppingTime"
            onOptionChange={handleShoppingTimeChange}
            className="grid grid-cols-3 md:grid-cols-3 gap-3"
          />
          {hasShoppingTimeError() && (
            <p className="text-sm font-medium text-destructive mt-2">
              {getErrorMessage(
                errors,
                "shopping.shoppingTime",
                texts.errors.shoppingTimeRequired
              )}
            </p>
          )}
        </div>
      </div>

      {/* Особые пожелания */}
      <div className="space-y-4">
        <div className="text-lg">{t.wishesQuestion}</div>
        <Controller
          name="shopping.specialWishes"
          control={control}
          render={({ field }) => (
            <Textarea
              id="specialWishes"
              placeholder={t.wishesPlaceholder}
              {...field}
              value={field.value || ""}
            />
          )}
        />
      </div>

      {/* Дополнительные услуги */}
      <div className="space-y-4">
        <h2 className="text-lg">{t.additionalServices}</h2>

        <div className="flex items-center space-x-2">
          <Controller
            name="shopping.deliveryServices.needed"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="deliveryNeeded"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked)
                  handleDeliveryChange(checked as boolean)
                }}
              />
            )}
          />
          <Label htmlFor="deliveryNeeded" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            {t.deliveryService}
          </Label>
        </div>
      </div>
    </div>
  )
}

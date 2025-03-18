// components/application/steps/StepShopping.tsx

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
  Store,
  Building,
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

export function StepShopping({
  control,
  errors,
  formData,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
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
      label: "Эконом",
      description: "Ищу выгодные предложения",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "medium",
      label: "Средний",
      description: "Готов потратить, но в разумных пределах",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "luxury",
      label: "Люкс",
      description: "Хочу купить что-то особенное",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
  ]

  // Опции для мест шоппинга
  const shoppingPlacesOptions: CardOption[] = [
    {
      name: "malls",
      label: "Торговые центры",
      description: "Большие торговые центры с разнообразием магазинов",
    },
    {
      name: "boutiques",
      label: "Брендовые бутики",
      description: "Специализированные магазины с брендовыми товарами",
    },
    {
      name: "markets",
      label: "Местные рынки и лавки",
      description: "Традиционные рынки с аутентичными товарами",
    },
    {
      name: "outlets",
      label: "Аутлеты",
      description: "Магазины со скидками на известные бренды",
    },
    {
      name: "other",
      label: "Другое",
      description: "Укажите свой вариант",
    },
  ]

  // Опции для времени шоппинга
  const shoppingTimeOptions: CardOption[] = [
    {
      name: "fewHours",
      label: "Пару часов",
      description: "Быстрый шоппинг",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      name: "halfDay",
      label: "Полдня",
      description: "Хочу осмотреться и купить что-то интересное",
      icon: <Clock1 className="h-5 w-5" />,
    },
    {
      name: "fullDay",
      label: "Целый день",
      description: "Шоппинг — это важно!",
      icon: <Clock12 className="h-5 w-5" />,
    },
  ]

  // Обработчики для бюджета - выбор только одного варианта
  const handleBudgetChange = (name: string, checked: boolean) => {
    // Если опция включена, выключаем все остальные опции
    if (checked) {
      // Сначала выключаем все опции
      budgetOptions.forEach((option) => {
        if (option.name !== name) {
          handleOptionChange?.("shopping.budget", option.name, false)
        }
      })
    }
    // Затем устанавливаем выбранную опцию
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
    // Если опция включена, выключаем все остальные опции
    if (checked) {
      // Сначала выключаем все опции
      shoppingTimeOptions.forEach((option) => {
        if (option.name !== name) {
          handleOptionChange?.("shopping.shoppingTime", option.name, false)
        }
      })
    }
    // Затем устанавливаем выбранную опцию
    handleOptionChange?.("shopping.shoppingTime", name, checked)
  }

  // Обработчик для доставки
  const handleDeliveryChange = (checked: boolean) => {
    // Напрямую устанавливаем значение для нашего флага
    handleOptionChange?.("shopping.deliveryServices", "needed", checked)
  }

  return (
    <div className="space-y-8">
      {/* Бюджет */}
      <div>
        <h3 className="text-lg">Какой у тебя примерный бюджет на шоппинг? </h3>
        <div className="text-xs text-muted-foreground">
          (выберите один вариант)
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

        {/* Отображаем ошибку, если есть */}
        {hasBudgetError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(errors, "shopping.budget") ||
              "Выберите один вариант бюджета"}
          </p>
        )}
      </div>

      {/* Места для шоппинга */}
      <div>
        <h3 className="text-lg">Где тебе больше нравится делать покупки?</h3>
        <div className="text-xs text-muted-foreground">
          (можно выбрать несколько)
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

        {/* Отображаем ошибку, если есть */}
        {hasShoppingPlacesError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(errors, "shopping.shoppingPlaces") ||
              "Выберите хотя бы одно место для шоппинга"}
          </p>
        )}

        {formData.shopping?.shoppingPlaces?.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="shoppingPlacesOtherDescription">
              Укажите свой вариант
            </Label>
            <Controller
              name="shopping.shoppingPlaces.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="shoppingPlacesOtherDescription"
                  placeholder="Опишите где вам нравится делать покупки"
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
                  "shopping.shoppingPlaces.otherDescription"
                ) || "Укажите описание для пункта 'Другое'"}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Время на шоппинг */}
      <div>
        <h3 className="text-lg font-medium">
          Сколько времени ты готов выделить на шоппинг?{" "}
        </h3>
        <div className="text-xs text-muted-foreground">
          (выберите один вариант)
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

        {/* Отображаем ошибку, если есть */}
        {hasShoppingTimeError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(errors, "shopping.shoppingTime") ||
              "Выберите одну продолжительность шоппинга"}
          </p>
        )}
      </div>

      {/* Особые пожелания */}
      <div className="space-y-2">
        <Label htmlFor="specialWishes" className="text-lg">
          Есть ли что-то, что ты точно хочешь купить в этой поездке?
        </Label>
        <Controller
          name="shopping.specialWishes"
          control={control}
          render={({ field }) => (
            <Textarea
              id="specialWishes"
              placeholder="Например, местные продукты, украшения или что-то уникальное"
              {...field}
              value={field.value || ""}
            />
          )}
        />
      </div>

      {/* Дополнительные услуги */}
      <div className="space-y-2">
        <h3 className="mb-4 text-sm font-medium">Дополнительные услуги</h3>

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
            Нужна помощь с доставкой покупок из интернет магазинов
          </Label>
        </div>
      </div>
    </div>
  )
}

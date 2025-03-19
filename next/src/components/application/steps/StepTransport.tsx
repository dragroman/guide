import React from "react"
import {
  Car,
  Bus,
  CarTaxiFront,
  PlusCircle,
  PlaneTakeoff,
  PersonStanding,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StepProps } from "../types"
import { Controller } from "react-hook-form"
import { CardSelector, CardOption } from "../components/CardSelector"
import {
  hasOptionsError,
  hasOtherDescriptionError,
  getErrorMessage,
} from "../utils/errorHelpers"

// Опции для трансфера из аэропорта
const transferOptions: CardOption[] = [
  {
    name: "airport",
    label: "Трансфер из аэропорта",
    description: "Встреча в аэропорту и доставка до отеля",
    icon: <PlaneTakeoff className="h-5 w-5" />,
  },
  {
    name: "individual",
    label: "Индивидуальный",
    description: "Персональный автомобиль с водителем",
    icon: <Car className="h-5 w-5" />,
  },
  {
    name: "none",
    label: "Не нужен",
    description: "Самостоятельное прибытие в отель",
    icon: <PersonStanding className="h-5 w-5" />,
  },
  {
    name: "other",
    label: "Другое",
    description: "Уточните ваши особые пожелания",
    icon: <PlusCircle className="h-5 w-5" />,
  },
]

// Опции для пожеланий к транспорту во время тура
const transportOptions: CardOption[] = [
  {
    name: "privateDriver",
    label: "Индивидуальный водитель",
    description: "Аренда автомобиля с водителем для удобства перемещений",
    icon: <Car className="h-5 w-5" />,
  },
  {
    name: "publicTransport",
    label: "Общественный транспорт",
    description:
      "Передвижение на автобусах, метро и другом общественном транспорте",
    icon: <Bus className="h-5 w-5" />,
  },
  {
    name: "taxi",
    label: "Такси",
    description: "Использование услуг такси по необходимости",
    icon: <CarTaxiFront className="h-5 w-5" />,
  },
  {
    name: "other",
    label: "Другое",
    description: "Уточните ваши особые пожелания к транспорту",
    icon: <PlusCircle className="h-5 w-5" />,
  },
]

export function StepTransport({
  control,
  errors,
  formData,
  handleOptionChange,
  handleTextChange,
}: StepProps) {
  // Проверки наличия ошибок для конкретных полей
  const hasTransferError = () => hasOptionsError(errors, "transport.transfer")
  const hasTransferOtherError = () =>
    hasOtherDescriptionError(errors, "transport.transfer")
  const hasTransportPreferencesError = () =>
    hasOptionsError(errors, "transport.preferences")
  const hasTransportPreferencesOtherError = () =>
    hasOtherDescriptionError(errors, "transport.preferences")

  // Используем универсальные обработчики, делегируя им конкретные пути
  const handleTransferChange = (name: string, checked: boolean) => {
    // Если опция включена, выключаем все остальные опции
    if (checked) {
      // Сначала выключаем все опции
      transferOptions.forEach((option) => {
        if (option.name !== name) {
          handleOptionChange?.("transport.transfer", option.name, false)
        }
      })
    }
    handleOptionChange?.("transport.transfer", name, checked)
  }

  const handleTransferTextChange = (value: string) => {
    handleTextChange?.("transport.transfer", value)
  }

  const handleTransportChange = (name: string, checked: boolean) => {
    handleOptionChange?.("transport.preferences", name, checked)
  }

  const handleTransportTextChange = (value: string) => {
    handleTextChange?.("transport.preferences", value)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Трансфер</h1>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg">Нужна ли встреча в аэропорту?</h3>
          <div className="text-xs text-muted-foreground">
            (можно выбрать только один)
          </div>
        </div>

        {hasTransferError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(
              errors,
              "transport.transfer",
              "Выберите хотя бы один тип трансфера"
            )}
          </p>
        )}
        <CardSelector
          options={transferOptions}
          formData={formData}
          path="transport.transfer"
          onOptionChange={handleTransferChange}
        />

        {formData.transport?.transfer?.other && (
          <div className="space-y-2">
            <div>
              <Label htmlFor="transferOtherDescription">
                Укажите ваши пожелания к трансферу
              </Label>
              (можно выбрать несколько)
            </div>
            <Controller
              name="transport.transfer.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="transferOtherDescription"
                  placeholder="Опишите ваши пожелания к трансферу из аэропорта"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e)
                    handleTransferTextChange(e.target.value)
                  }}
                  className={
                    hasTransferOtherError() ? "border-destructive" : ""
                  }
                />
              )}
            />
            {hasTransferOtherError() && (
              <p className="text-sm font-medium text-destructive">
                {getErrorMessage(
                  errors,
                  "transport.transfer.otherDescription",
                  "Укажите описание для пункта 'Другое'"
                )}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg">Выбираем удобный способ передвижения</h3>
          <div className="text-xs text-muted-foreground">
            (можно выбрать несколько)
          </div>
        </div>
        {/* Используем CardSelector с обновленными путями */}
        <CardSelector
          options={transportOptions}
          formData={formData}
          path="transport.preferences"
          onOptionChange={handleTransportChange}
        />
        {/* Отображаем ошибку, если есть */}
        {hasTransportPreferencesError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(
              errors,
              "transport.preferences",
              "Выберите хотя бы один вариант транспорта"
            )}
          </p>
        )}
        {formData.transport?.preferences?.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="transportPreferencesOtherDescription">
              Укажите ваши пожелания к транспорту
            </Label>
            <Controller
              name="transport.preferences.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="transportPreferencesOtherDescription"
                  placeholder="Опишите ваши пожелания к транспорту во время тура"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e)
                    handleTransportTextChange(e.target.value)
                  }}
                  className={
                    hasTransportPreferencesOtherError()
                      ? "border-destructive"
                      : ""
                  }
                />
              )}
            />
            {hasTransportPreferencesOtherError() && (
              <p className="text-sm font-medium text-destructive">
                {getErrorMessage(
                  errors,
                  "transport.preferences.otherDescription",
                  "Укажите описание для пункта 'Другое'"
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

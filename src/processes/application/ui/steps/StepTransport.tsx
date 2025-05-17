import React from "react"
import {
  Car,
  Bus,
  CarTaxiFront,
  PlusCircle,
  PlaneTakeoff,
  PersonStanding,
} from "lucide-react"
import { Label } from "@shared/ui/label"
import { Textarea } from "@shared/ui/textarea"
import { StepProps } from "../../model/types"
import { Controller } from "react-hook-form"
import { CardSelector, CardOption } from "../CardSelector"
import {
  hasOptionsError,
  hasOtherDescriptionError,
  getErrorMessage,
} from "../../utils/errorHelpers"
import texts from "../../localization/ru" // Импортируем тексты

// Опции для трансфера из аэропорта
const transferOptions: CardOption[] = [
  {
    name: "airport",
    label: texts.transport.transfer.airport.label,
    description: texts.transport.transfer.airport.description,
    icon: <PlaneTakeoff className="h-5 w-5" />,
  },
  {
    name: "individual",
    label: texts.transport.transfer.individual.label,
    description: texts.transport.transfer.individual.description,
    icon: <Car className="h-5 w-5" />,
  },
  {
    name: "none",
    label: texts.transport.transfer.none.label,
    description: texts.transport.transfer.none.description,
    icon: <PersonStanding className="h-5 w-5" />,
  },
  {
    name: "other",
    label: texts.transport.transfer.other.label,
    description: texts.transport.transfer.other.description,
    icon: <PlusCircle className="h-5 w-5" />,
  },
]

// Опции для пожеланий к транспорту во время тура
const transportOptions: CardOption[] = [
  {
    name: "privateDriver",
    label: texts.transport.preferences.privateDriver.label,
    description: texts.transport.preferences.privateDriver.description,
    icon: <Car className="h-5 w-5" />,
  },
  {
    name: "publicTransport",
    label: texts.transport.preferences.publicTransport.label,
    description: texts.transport.preferences.publicTransport.description,
    icon: <Bus className="h-5 w-5" />,
  },
  {
    name: "taxi",
    label: texts.transport.preferences.taxi.label,
    description: texts.transport.preferences.taxi.description,
    icon: <CarTaxiFront className="h-5 w-5" />,
  },
  {
    name: "other",
    label: texts.transport.preferences.other.label,
    description: texts.transport.preferences.other.description,
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
      <h1 className="text-3xl font-bold">{texts.transport.title}</h1>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg">{texts.transport.transferQuestion}</h3>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectOne}
          </div>
        </div>

        {hasTransferError() && (
          <p className="text-sm font-medium text-destructive mt-2">
            {getErrorMessage(
              errors,
              "transport.transfer",
              texts.errors.transferRequired
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
                {texts.transport.otherTransferLabel}
              </Label>
              {texts.common.selectMultiple}
            </div>
            <Controller
              name="transport.transfer.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="transferOtherDescription"
                  placeholder={texts.transport.otherTransferPlaceholder}
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
                  texts.errors.otherDescription
                )}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg">{texts.transport.transportQuestion}</h3>
          <div className="text-xs text-muted-foreground">
            {texts.common.selectMultiple}
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
              texts.errors.transferRequired
            )}
          </p>
        )}
        {formData.transport?.preferences?.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="transportPreferencesOtherDescription">
              {texts.transport.otherTransportLabel}
            </Label>
            <Controller
              name="transport.preferences.otherDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="transportPreferencesOtherDescription"
                  placeholder={texts.transport.otherTransportPlaceholder}
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
                  texts.errors.otherDescription
                )}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

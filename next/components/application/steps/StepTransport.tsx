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
    name: "shuttle",
    label: "Шаттл",
    description: "Групповой трансфер по расписанию",
    icon: <Bus className="h-5 w-5" />,
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
  // Используем универсальные обработчики, делегируя им конкретные пути
  const handleTransferChange = (name: string, checked: boolean) => {
    handleOptionChange?.("transport.transfer", name, checked)
  }

  const handleTransferTextChange = (value: string) => {
    handleTextChange?.("transport.transfer", value)
  }

  const handleTransportChange = (name: string, checked: boolean) => {
    handleOptionChange?.("transport.transportPreferences", name, checked)
  }

  const handleTransportTextChange = (value: string) => {
    handleTextChange?.("transport.transportPreferences", value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">
          Нужен ли трансфер из аэропорта до отеля?
        </h3>

        {/* Используем универсальный CardSelector вместо TransferOptionsSelector */}
        <CardSelector
          options={transferOptions}
          formData={formData}
          path="transport.transfer"
          onOptionChange={handleTransferChange}
        />

        {formData.transport?.transfer?.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="transferOtherDescription">
              Укажите ваши пожелания к трансферу
            </Label>
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
                    errors?.transport?.transfer?.otherDescription
                      ? "border-destructive"
                      : ""
                  }
                />
              )}
            />
            {errors?.transport?.transfer?.otherDescription && (
              <p className="text-sm font-medium text-destructive">
                {errors.transport.transfer.otherDescription.message as string}
              </p>
            )}
          </div>
        )}

        {/* Ошибка валидации типа трансфера */}
        {errors?.transport?.transfer?._error && (
          <p className="text-sm font-medium text-destructive mt-2">
            {errors.transport.transfer._error.message as string}
          </p>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">
          Пожелания к транспорту во время тура
        </h3>

        {/* Используем универсальный CardSelector вместо TransportCardSelector */}
        <CardSelector
          options={transportOptions}
          formData={formData}
          path="transport.transportPreferences"
          onOptionChange={handleTransportChange}
        />

        {formData.transport?.transportPreferences?.other && (
          <div className="space-y-2 mt-3">
            <Label htmlFor="transportPreferencesOtherDescription">
              Укажите ваши пожелания к транспорту
            </Label>
            <Controller
              name="transport.transportPreferences.otherDescription"
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
                    errors?.transport?.transportPreferences?.otherDescription
                      ? "border-destructive"
                      : ""
                  }
                />
              )}
            />
            {errors?.transport?.transportPreferences?.otherDescription && (
              <p className="text-sm font-medium text-destructive">
                {
                  errors.transport.transportPreferences.otherDescription
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

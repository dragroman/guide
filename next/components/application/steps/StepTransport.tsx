import React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StepProps } from "../types"
import { Controller } from "react-hook-form"
import { TransportCardSelector } from "../components/TransportCardSelector"
import { TransferOptionsSelector } from "../components/TransferOptionsSelector"

export function StepTransport({
  control,
  errors,
  formData,
  setValue,
}: StepProps) {
  // Обработчик для выбора трансфера из аэропорта
  const handleTransferChange = (name: string, checked: boolean) => {
    const currentTransfer = formData.transport?.transfer || {}

    const updatedTransfer = {
      ...currentTransfer,
      [name]: checked,
    }

    // Если снимаем галочку "Другое", очищаем описание
    if (name === "other" && !checked) {
      setValue("transport.transfer.otherDescription", "")
    }

    setValue("transport.transfer", updatedTransfer)

    // Если выбран хотя бы один вид трансфера, снимаем ошибку
    const hasTransfer = Object.entries(updatedTransfer)
      .filter(([key]) => key !== "otherDescription")
      .some(([_, value]) => value === true)

    if (hasTransfer && errors?.transport?.transfer) {
      setValue("transport.transfer._error", undefined)
    }
  }

  // Обработчик для выбора пожеланий к транспорту во время тура
  const handleTransportChange = (name: string, checked: boolean) => {
    const currentTransport = formData.transport?.transportPreferences || {}

    const updatedTransport = {
      ...currentTransport,
      [name]: checked,
    }

    // Если снимаем галочку "Другое", очищаем описание
    if (name === "other" && !checked) {
      setValue("transport.transportPreferences.otherDescription", "")
    }

    setValue("transport.transportPreferences", updatedTransport)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-medium">
          Нужен ли трансфер из аэропорта до отеля?
        </h3>

        <TransferOptionsSelector
          formData={formData}
          handleTransferChange={handleTransferChange}
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

        <TransportCardSelector
          formData={formData}
          handleTransportChange={handleTransportChange}
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

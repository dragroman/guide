import React from "react"
import { format } from "date-fns"
import { getDaysText } from "@shared/utils/getDay"
import { StepProps } from "../../model/types"
import { SmilePlus } from "lucide-react"
import texts from "../../localization/ru"
import { LocationDescription } from "../LocationDescription"
import DownloadPdfButton from "../DownloadPdfButton"

export function StepConfirmation({ formData }: StepProps) {
  const t = texts.confirmation

  // Извлекаем текст из локализации по пути (например, "food.cuisine.chinese")
  const getLocalizedText = (path: string, key: string): string => {
    const parts = path.split(".")
    let current: any = texts

    for (const part of parts) {
      current = current[part]
      if (!current) return key
    }

    return current[key]?.label || key
  }

  // Генерирует строку из выбранных опций
  const formatOptions = (
    options: Record<string, any>,
    path: string,
    skipKeys = ["otherDescription", "_error"]
  ) => {
    const selectedOptions = Object.entries(options)
      .filter(([key, value]) => value === true && !skipKeys.includes(key))
      .map(([key]) => getLocalizedText(path, key))
      .join(", ")

    // Добавляем описание для "other" если есть
    const otherDescription =
      options.other && options.otherDescription ? (
        <div className="mt-1 text-xs italic">{options.otherDescription}</div>
      ) : null

    return selectedOptions ? (
      <>
        {selectedOptions}
        {otherDescription}
      </>
    ) : null
  }

  // Рендерит блок информации если есть данные
  const InfoBlock = ({
    label,
    value,
    condition = true,
  }: {
    label: string
    value: React.ReactNode
    condition?: boolean
  }) => {
    if (!condition || (typeof value === "string" && !value.trim()) || !value) {
      return null
    }

    return (
      <div className="py-2 border-b border-gray-100 last:border-b-0">
        <div className="text-xs text-muted-foreground mb-1">{label}</div>
        <div className="font-medium text-sm break-words">{value}</div>
      </div>
    )
  }

  const hasOptions = (
    options: Record<string, any>,
    skipKeys = ["otherDescription", "_error"]
  ) =>
    Object.entries(options).some(
      ([key, value]) => value === true && !skipKeys.includes(key)
    )

  // Форматирование дат
  const formatDateRange = () => {
    const { from, to } = formData.trip.dateRange || {}
    return from && to
      ? `${format(from, "dd.MM.yyyy")} - ${format(to, "dd.MM.yyyy")}`
      : null
  }

  return (
    <div className="touch-action-manipulation space-y-8">
      <div className="text-muted-foreground">
        <div>
          {formData.peopleCount > 1
            ? t.groupTravelerPrefix
            : t.soloTravelerPrefix}
        </div>
        <div className="font-bold text-2xl">{formData.name}</div>
      </div>
      <LocationsList cities={formData.cities} />

      <div className="rounded-md overflow-hidden">
        {/* Информация о группе */}
        {formData.peopleCount > 1 && (
          <>
            <InfoBlock label={t.groupSize} value={formData.peopleCount} />
            <InfoBlock
              label={t.ageGroups}
              value={Object.entries(formData.ageGroups).map(
                ([key, value], index, arr) => (
                  <span key={key}>
                    {`${texts.ageGroups[key as keyof typeof texts.ageGroups] || key}: ${value}`}
                    {index < arr.length - 1 ? ", " : ""}
                  </span>
                )
              )}
              condition={Object.keys(formData.ageGroups).length > 0}
            />
          </>
        )}

        {/* Контактная информация */}
        <InfoBlock label={t.phone} value={formData.contact.phone} />
        <InfoBlock label={t.email} value={formData.contact.email} />
        <InfoBlock label={t.wechat} value={formData.contact.wechat} />
        <InfoBlock label={t.telegram} value={formData.contact.telegram} />
        <InfoBlock label={t.whatsapp} value={formData.contact.whatsapp} />

        {/* Цель поездки */}
        <InfoBlock
          label={t.tripPurpose}
          value={formatOptions(
            formData.trip.purpose.options,
            "tripPurpose.options"
          )}
          condition={hasOptions(formData.trip.purpose.options)}
        />

        {/* Размещение */}
        <InfoBlock
          label={t.accommodationType}
          value={formatOptions(
            formData.accommodation.options,
            "accommodation.options"
          )}
          condition={hasOptions(formData.accommodation.options)}
        />

        <InfoBlock
          label={t.accommodationPreferences}
          value={formatOptions(
            formData.accommodation.preferences,
            "accommodation.preferences"
          )}
          condition={hasOptions(formData.accommodation.preferences)}
        />

        {/* Даты и продолжительность */}
        <InfoBlock label={t.dates} value={formatDateRange()} />
        <InfoBlock
          label={t.duration}
          value={`${formData.trip.daysCount} ${getDaysText(formData.trip.daysCount ?? 0)}`}
          condition={!!formData.trip.daysCount}
        />

        {/* Питание */}
        <InfoBlock
          label={t.cuisinePreferences}
          value={formatOptions(formData.food.cuisine, "food.cuisine")}
          condition={hasOptions(formData.food.cuisine)}
        />

        <InfoBlock
          label={t.foodInfo}
          value={formatOptions(formData.food.preferences, "food.preferences")}
          condition={hasOptions(formData.food.preferences)}
        />

        {/* Транспорт */}
        <InfoBlock
          label={t.transfer}
          value={formatOptions(
            formData.transport.transfer,
            "transport.transfer"
          )}
          condition={hasOptions(formData.transport.transfer)}
        />

        <InfoBlock
          label={t.transportInfo}
          value={formatOptions(
            formData.transport.preferences,
            "transport.preferences"
          )}
          condition={hasOptions(formData.transport.preferences)}
        />

        {/* Шоппинг */}
        <InfoBlock
          label={t.shoppingBudget}
          value={formatOptions(formData.shopping.budget, "shopping.budget")}
          condition={hasOptions(formData.shopping.budget)}
        />

        <InfoBlock
          label={t.shoppingPlaces}
          value={formatOptions(
            formData.shopping.shoppingPlaces,
            "shopping.places"
          )}
          condition={hasOptions(formData.shopping.shoppingPlaces)}
        />

        <InfoBlock
          label={t.shoppingBudget}
          value={formatOptions(formData.shopping.shoppingTime, "shopping.time")}
          condition={hasOptions(formData.shopping.shoppingTime)}
        />

        <InfoBlock
          label={t.specialWishes}
          value={formData.shopping.specialWishes}
        />

        {/* Бюджет и дополнительные услуги */}
        <InfoBlock
          label={t.budget}
          value={`${formData.budget} ₽`}
          condition={!!formData.budget}
        />
        <InfoBlock
          label={t.visa}
          value="Требуется"
          condition={formData.needVisa}
        />
        <InfoBlock
          label={t.insurance}
          value="Требуется"
          condition={formData.needInsurance}
        />
      </div>
      {/* TODO: PDF button */}
      {/* <div className="flex justify-center mt-6">
        <DownloadPdfButton
          formData={formData}
          className="w-full py-3 text-base"
        />
      </div> */}
      <div className="text-muted-foreground flex items-start border border-gray-200 rounded-md p-3">
        <SmilePlus className="flex-shrink-0 mr-4 w-6 h-6 mt-1" />
        <div>
          <div className="mb-1">{t.reminderTitle}</div>
          <div className="text-muted-foreground text-xs">{t.reminderText}</div>
        </div>
      </div>
    </div>
  )
}

function LocationsList({ cities }: { cities: string[] }) {
  if (!cities || cities.length === 0) return null

  // Если только один город
  if (cities.length === 1) {
    return <LocationDescription value={cities[0]} />
  }

  // Если несколько городов
  return (
    <div className="space-y-4">
      <div className="text-md font-medium">Выбранные города:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {cities.map((cityId, index) => (
          <LocationDescription
            key={index}
            value={cityId}
            length={cities.length}
          />
        ))}
      </div>
    </div>
  )
}

import React from "react"
import { format } from "date-fns"
import { getDaysText } from "../utils"
import { StepProps } from "../types"

export function StepConfirmation({ formData }: StepProps) {
  // Функция для отображения выбранных опций
  const getSelectedOptions = (
    options: Record<string, any>,
    skipKeys: string[] = []
  ) => {
    return Object.entries(options)
      .filter(
        ([key, value]) =>
          typeof value === "boolean" &&
          value === true &&
          !skipKeys.includes(key)
      )
      .map(([key]) => {
        // Преобразуем ключи в удобочитаемые названия
        switch (key) {
          case "hotel3":
            return "Отель 3★"
          case "hotel4":
            return "Отель 4★"
          case "hotel5":
            return "Отель 5★"
          case "apartment":
            return "Апартаменты"
          case "hostel":
            return "Хостел"
          case "excursion":
            return "Экскурсии"
          case "business":
            return "Деловая поездка"
          case "shopping":
            return "Шоппинг"
          case "food":
            return "Гастрономический туризм"
          case "fun":
            return "Развлечения"
          case "centralLocation":
            return "Близость к центру города"
          case "nearShoppingCenters":
            return "Близость к торговым центрам"
          case "poolAndSpa":
            return "Наличие бассейна, спа, фитнеса"
          case "other":
            return "Другое"
          default:
            return key
        }
      })
      .join(", ")
  }

  // Функция для рендеринга информационного блока
  const renderInfoBlock = (label: string, value: React.ReactNode) => (
    <div className="p-3 border-b border-gray-100 last:border-b-0">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="font-medium text-sm break-words">{value}</div>
    </div>
  )

  return (
    <div className="touch-action-manipulation">
      <h3 className="font-medium text-lg mb-4">Проверьте данные:</h3>

      <div className="bg-muted/30 rounded-md overflow-hidden">
        {/* Используем отдельные карточки для каждого блока данных */}
        {renderInfoBlock("Имя", formData.name)}

        {renderInfoBlock("Количество участников", formData.peopleCount)}

        {formData.ageGroups &&
          renderInfoBlock(
            "Возрастные группы",
            Object.entries(formData.ageGroups).map(
              ([key, value], index, arr) => (
                <span key={key}>
                  {`${key}: ${value}`}
                  {index < arr.length - 1 ? ", " : ""}
                </span>
              )
            )
          )}

        {renderInfoBlock("Телефон", formData.contact.phone)}

        {renderInfoBlock("Email", formData.contact.email)}

        {renderInfoBlock(
          "Цель поездки",
          <>
            {getSelectedOptions(formData.trip.purpose.options, [
              "otherDescription",
            ])}
            {formData.trip.purpose.options.other &&
            formData.trip.purpose.otherDescription ? (
              <div className="mt-1 text-xs italic">
                {formData.trip.purpose.otherDescription}
              </div>
            ) : null}
          </>
        )}

        {renderInfoBlock(
          "Тип размещения",
          <>
            {getSelectedOptions(formData.accommodation.options, [
              "otherDescription",
            ])}
            {formData.accommodation.options.other &&
            formData.accommodation.options.otherDescription ? (
              <div className="mt-1 text-xs italic">
                {formData.accommodation.options.otherDescription}
              </div>
            ) : null}
          </>
        )}

        {formData.accommodation.preferences.other && (
          <div className="mt-2">
            {renderInfoBlock(
              "Пожелания к размещению",
              <>
                {getSelectedOptions(formData.accommodation.preferences, [
                  "otherDescription",
                ])}
                {formData.accommodation.preferences.other &&
                formData.accommodation.preferences.otherDescription ? (
                  <div className="mt-1 text-xs italic">
                    {formData.accommodation.preferences.otherDescription}
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}

        {renderInfoBlock(
          "Даты",
          formData.trip.dateRange?.from && formData.trip.dateRange?.to
            ? `${format(formData.trip.dateRange.from, "dd.MM.yyyy")} - ${format(formData.trip.dateRange.to, "dd.MM.yyyy")}`
            : "Не выбраны"
        )}

        {renderInfoBlock(
          "Продолжительность",
          `${formData.trip.daysCount} ${getDaysText(formData.trip.daysCount ?? 0)}`
        )}

        {renderInfoBlock(
          "Предпочтения по кухне",
          <>
            {getSelectedOptions(formData.food.cuisine, [
              "otherDescription",
              "_error",
            ])}
            {formData.food.cuisine.other &&
            formData.food.cuisine.otherDescription ? (
              <div className="mt-1 text-xs italic">
                {formData.food.cuisine.otherDescription}
              </div>
            ) : null}
          </>
        )}
        {formData.food.preferences.other && (
          <div className="mt-2">
            {renderInfoBlock(
              "Дополнительная информация о питании",
              <>
                {getSelectedOptions(formData.food.preferences, [
                  "otherDescription",
                ])}
                {formData.food.preferences.other &&
                formData.food.preferences.otherDescription ? (
                  <div className="mt-1 text-xs italic">
                    {formData.food.preferences.otherDescription}
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}
        {renderInfoBlock(
          "Трансфер",
          <>
            {getSelectedOptions(formData.transport.transfer, [
              "otherDescription",
              "_error",
            ])}
            {formData.transport.transfer.other &&
            formData.transport.transfer.otherDescription ? (
              <div className="mt-1 text-xs italic">
                {formData.transport.transfer.otherDescription}
              </div>
            ) : null}
          </>
        )}
        {formData.transport.preferences.other && (
          <div className="mt-2">
            {renderInfoBlock(
              "Дополнительная информация о транспорте",
              <>
                {getSelectedOptions(formData.transport.preferences, [
                  "otherDescription",
                ])}
                {formData.transport.preferences.other &&
                formData.transport.preferences.otherDescription ? (
                  <div className="mt-1 text-xs italic">
                    {formData.transport.preferences.otherDescription}
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

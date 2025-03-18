import React from "react"
import { format } from "date-fns"
import { getDaysText } from "../utils"
import { StepProps } from "../types"
import { SmilePlus } from "lucide-react"

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
          case "malls":
            return "Торговые центры"
          default:
            return key
        }
      })
      .join(", ")
  }

  // Функция для рендеринга информационного блока
  const renderInfoBlock = (label: string, value: React.ReactNode) => (
    <div className="py-2 border-b border-gray-100 last:border-b-0">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="font-medium text-sm break-words">{value}</div>
    </div>
  )

  return (
    <div className="touch-action-manipulation space-y-8">
      <div className="text-muted-foreground">
        {formData.peopleCount > 1 ? (
          <div>Вот что у нас получилось для командира группы</div>
        ) : (
          <div>Вот что у нас получилось для лучшего путешественника</div>
        )}
        <div className="font-bold text-2xl">{formData.name}</div>
      </div>

      <div className="rounded-md overflow-hidden">
        {/* Используем отдельные карточки для каждого блока данных */}

        {formData.peopleCount > 1 && (
          <div>
            {renderInfoBlock("В группе", formData.peopleCount)}
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
          </div>
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
        {renderInfoBlock(
          "Бюджет для покупок",
          <>{getSelectedOptions(formData.shopping.budget, ["_error"])}</>
        )}
        {renderInfoBlock(
          "Места для покупок",
          <>
            {getSelectedOptions(formData.shopping.shoppingPlaces, [
              "otherDescription",
              "_error",
            ])}
            {formData.shopping.shoppingPlaces.other &&
            formData.shopping.shoppingPlaces.otherDescription ? (
              <div className="mt-1 text-xs italic">
                {formData.shopping.shoppingPlaces.otherDescription}
              </div>
            ) : null}
          </>
        )}
        {renderInfoBlock(
          "Бюджет для покупок",
          <>{getSelectedOptions(formData.shopping.shoppingTime, ["_error"])}</>
        )}
        {formData.shopping.specialWishes && (
          <div>
            {renderInfoBlock(
              "Особые желания",
              <>{formData.shopping.specialWishes}</>
            )}
          </div>
        )}
        {renderInfoBlock(
          "Примерный бюджет на человека в день",
          <>{formData.budget} ₽</>
        )}
        {formData.needVisa && (
          <div>{renderInfoBlock("Оформление визы", "Требуется")}</div>
        )}
        {formData.needInsurance && (
          <div>{renderInfoBlock("Нужна страховка", <>Требуется</>)}</div>
        )}
      </div>
      <div className="text-muted-foreground flex items-start border border-gray-200 rounded-md p-3">
        <SmilePlus className="flex-shrink-0 mr-4 w-6 h-6 mt-1" />
        <div>
          <div className="mb-1">Помни!</div>
          <div className="text-muted-foreground text-xs">
            Ты в любой момент можешь вернуться и исправить любые данные,
            воспользовавшись навигацией вверху экрана
          </div>
        </div>
      </div>
    </div>
  )
}

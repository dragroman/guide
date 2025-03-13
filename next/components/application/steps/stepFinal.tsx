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

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Проверьте введенные данные:</h3>
      <div className="space-y-2 p-4 bg-muted/50 rounded-md">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Имя:</span>
          <span className="font-medium">{formData.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Телефон:</span>
          <span className="font-medium">{formData.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Электронная почта:</span>
          <span className="font-medium">{formData.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Цель поездки:</span>
          <span className="font-medium">
            {getSelectedOptions(formData.tripPurpose, ["otherDescription"])}
            {formData.tripPurpose.other && formData.tripPurpose.otherDescription
              ? ` (${formData.tripPurpose.otherDescription})`
              : ""}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Тип размещения:</span>
          <span className="font-medium">
            {getSelectedOptions(formData.accommodation, ["otherDescription"])}
            {formData.accommodation.other &&
            formData.accommodation.otherDescription
              ? ` (${formData.accommodation.otherDescription})`
              : ""}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Пожелания к размещению:</span>
          <span className="font-medium">
            {getSelectedOptions(formData.accommodationPreferences, [
              "otherDescription",
            ])}
            {formData.accommodationPreferences.other &&
            formData.accommodationPreferences.otherDescription
              ? ` (${formData.accommodationPreferences.otherDescription})`
              : ""}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Даты:</span>
          <span className="font-medium">
            {formData.dateRange?.from && formData.dateRange?.to
              ? `${format(formData.dateRange.from, "dd.MM.yyyy")} - ${format(formData.dateRange.to, "dd.MM.yyyy")}`
              : "Не выбраны"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Продолжительность поездки:
          </span>
          <span className="font-medium">
            {formData.daysCount?.toString()}{" "}
            {getDaysText(formData.daysCount ?? 0)}
          </span>
        </div>
      </div>
    </div>
  )
}

import React from "react"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export interface CardOption {
  name: string
  label: string
  description: string
  icon?: React.ReactNode
  extraData?: Record<string, any>
}

export interface CardSelectorProps {
  options: CardOption[]
  formData: any
  path: string // Путь к данным внутри formData, например "transport.transfer"
  onOptionChange: (name: string, checked: boolean) => void
  // Дополнительные пропсы
  renderExtraContent?: (
    option: CardOption,
    isChecked: boolean
  ) => React.ReactNode
  className?: string
  cardClassName?: (option: CardOption, isChecked: boolean) => string
  iconClassName?: (option: CardOption, isChecked: boolean) => string
}

/**
 * Универсальный компонент для выбора опций в виде карточек
 */
export function CardSelector({
  options,
  formData,
  path,
  onOptionChange,
  renderExtraContent,
  className = "grid grid-cols-2 gap-3",
  cardClassName = () => "",
  iconClassName = (_, isChecked) =>
    isChecked ? "bg-primary text-primary-foreground" : "bg-muted",
}: CardSelectorProps) {
  // Функция для получения значения по пути
  const getValue = (data: any, path: string) => {
    return path
      .split(".")
      .reduce((prev, curr) => (prev ? prev[curr] : undefined), data)
  }

  // Получаем данные по указанному пути
  const pathData = getValue(formData, path)

  // Если путь не найден в данных формы, выводим предупреждение в консоль
  if (!pathData && process.env.NODE_ENV !== "production") {
    console.warn(`Path "${path}" not found in formData`, formData)
  }

  return (
    <div className={className}>
      {options.map((option) => {
        // Проверяем, выбрана ли опция
        const isChecked = pathData ? pathData[option.name] === true : false

        return (
          <Card
            key={option.name}
            className={`cursor-pointer transition-all ${
              isChecked
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            } ${cardClassName(option, isChecked)}`}
            onClick={() => onOptionChange(option.name, !isChecked)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-start">
                {option.icon && (
                  <div
                    className={`p-2 rounded-full mb-2 ${iconClassName(option, isChecked)}`}
                  >
                    {option.icon}
                  </div>
                )}
                <p className="font-medium">{option.label}</p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
                {isChecked && (
                  <div className="absolute top-2 right-2 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                {/* Дополнительный контент, если он предоставлен */}
                {renderExtraContent && renderExtraContent(option, isChecked)}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

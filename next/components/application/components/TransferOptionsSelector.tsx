import React from "react"
import {
  Check,
  Car,
  Bus,
  PersonStanding,
  Calendar,
  PlaneTakeoff,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Определение типов для опций трансфера
type TransferOptionType = {
  name: string
  label: string
  description: string
  icon: React.ReactNode
}

// Список опций трансфера с иконками и описанием
export const transferOptions: TransferOptionType[] = [
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
    icon: <Calendar className="h-5 w-5" />,
  },
]

interface TransferOptionsSelectorProps {
  formData: any
  handleTransferChange: (name: string, checked: boolean) => void
}

export function TransferOptionsSelector({
  formData,
  handleTransferChange,
}: TransferOptionsSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {transferOptions.map((option) => {
        const isChecked = formData.transport?.transfer?.[option.name] || false

        return (
          <Card
            key={option.name}
            className={`cursor-pointer transition-all ${
              isChecked
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => handleTransferChange(option.name, !isChecked)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-start">
                <div
                  className={`p-2 rounded-full mb-2 ${
                    isChecked
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {option.icon}
                </div>
                <p className="font-medium">{option.label}</p>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
                {isChecked && (
                  <div className="absolute top-2 right-2 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

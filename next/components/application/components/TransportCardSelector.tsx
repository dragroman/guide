import React from "react"
import { Check, Car, Bus, CarTaxiFront, PlusCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Определение типов для пожеланий к транспорту
type TransportPreferenceType = {
  name: string
  label: string
  description: string
  icon: React.ReactNode
}

// Список пожеланий к транспорту с иконками и описанием
export const transportPreferences: TransportPreferenceType[] = [
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

interface TransportCardSelectorProps {
  formData: any
  handleTransportChange: (name: string, checked: boolean) => void
}

export function TransportCardSelector({
  formData,
  handleTransportChange,
}: TransportCardSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {transportPreferences.map((preference) => {
        const isChecked =
          formData.transport?.transportPreferences?.[preference.name] || false

        return (
          <Card
            key={preference.name}
            className={`cursor-pointer transition-all ${
              isChecked
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => handleTransportChange(preference.name, !isChecked)}
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
                  {preference.icon}
                </div>
                <p className="font-medium">{preference.label}</p>
                <p className="text-xs text-muted-foreground">
                  {preference.description}
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

import React from "react"
import { Check, Home, Building, Warehouse, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Определение типов для размещения
type AccommodationType = {
  name: string
  label: string
  description: string
  icon: React.ReactNode
}

// Список вариантов размещения с иконками и описанием
export const accommodations: AccommodationType[] = [
  {
    name: "hotel3",
    label: "Отель 3",
    description: "Комфортабельные номера с базовыми удобствами",
    icon: <Star className="h-5 w-5" />,
  },
  {
    name: "hotel4",
    label: "Отель 4",
    description: "Улучшенные номера с дополнительными услугами",
    icon: <Star className="h-5 w-5" />,
  },
  {
    name: "hotel5",
    label: "Отель 5",
    description: "Люксовые номера с полным спектром услуг",
    icon: <Star className="h-5 w-5" />,
  },
  {
    name: "apartment",
    label: "Апартаменты",
    description: "Самостоятельное проживание с кухней и гостиной",
    icon: <Building className="h-5 w-5" />,
  },
  {
    name: "hostel",
    label: "Хостел",
    description: "Бюджетное размещение в общих номерах",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "other",
    label: "Другое",
    description: "Уточните ваши особые пожелания",
    icon: <Warehouse className="h-5 w-5" />,
  },
]

interface AccommodationCardSelectorProps {
  formData: any
  handleAccommodationChange: (name: string, checked: boolean) => void
}

export function AccommodationCardSelector({
  formData,
  handleAccommodationChange,
}: AccommodationCardSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {accommodations.map((accommodation) => {
        const isChecked =
          formData.accommodation[
            accommodation.name as keyof typeof formData.accommodation
          ]

        return (
          <Card
            key={accommodation.name}
            className={`cursor-pointer transition-all ${
              isChecked
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() =>
              handleAccommodationChange(accommodation.name, !isChecked)
            }
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
                  {accommodation.icon}
                </div>
                <p className="font-medium">{accommodation.label}</p>
                <p className="text-xs text-muted-foreground">
                  {accommodation.description}
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

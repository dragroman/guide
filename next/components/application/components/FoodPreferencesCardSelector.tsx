import React from "react"
import { Check, Flame, Leaf, Star, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Определение типов для предпочтений по питанию
type FoodPreferenceType = {
  name: string
  label: string
  description: string
  icon: React.ReactNode
}

// Список предпочтений по питанию с иконками и описанием
export const foodPreferences: FoodPreferenceType[] = [
  {
    name: "tryLocal",
    label: "Местная кухня",
    description: "Хочу попробовать аутентичные местные блюда",
    icon: <Star className="h-5 w-5" />,
  },
  {
    name: "spicyOk",
    label: "Острая пища",
    description: "Нормально переношу острую пищу",
    icon: <Flame className="h-5 w-5" />,
  },
  {
    name: "fattyOk",
    label: "Жирная пища",
    description: "Нормально переношу жирную пищу",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    name: "other",
    label: "Особые требования",
    description: "Диеты, аллергии или другие предпочтения",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
]

interface FoodPreferencesCardSelectorProps {
  formData: any
  handleFoodPreferenceChange: (name: string, checked: boolean) => void
}

export function FoodPreferencesCardSelector({
  formData,
  handleFoodPreferenceChange,
}: FoodPreferencesCardSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {foodPreferences.map((preference) => {
        const isChecked =
          formData.foodPreferences?.preferences?.[
            preference.name as keyof typeof formData.foodPreferences.preferences
          ]

        return (
          <Card
            key={preference.name}
            className={`cursor-pointer transition-all ${
              isChecked
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() =>
              handleFoodPreferenceChange(preference.name, !isChecked)
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

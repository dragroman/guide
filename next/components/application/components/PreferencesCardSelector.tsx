import React from "react"
import { Check, MapPin, ShoppingBag, Dumbbell, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Определение типов для предпочтений
type PreferenceType = {
  name: string
  label: string
  description: string
  icon: React.ReactNode
}

// Список предпочтений с иконками и описанием
export const preferences: PreferenceType[] = [
  {
    name: "centralLocation",
    label: "Близость к центру",
    description: "Удобное расположение в центральной части города",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    name: "nearShoppingCenters",
    label: "Рядом с магазинами",
    description: "Близкое расположение к торговым центрам и рынкам",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
  {
    name: "poolAndSpa",
    label: "Бассейн и спа",
    description: "Наличие бассейна, спа-зоны и фитнес-центра",
    icon: <Dumbbell className="h-5 w-5" />,
  },
  {
    name: "other",
    label: "Другое",
    description: "Другие особые пожелания к размещению",
    icon: <Sparkles className="h-5 w-5" />,
  },
]

interface PreferencesCardSelectorProps {
  formData: any
  handlePreferenceChange: (name: string, checked: boolean) => void
}

export function PreferencesCardSelector({
  formData,
  handlePreferenceChange,
}: PreferencesCardSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {preferences.map((preference) => {
        const isChecked =
          formData.accommodationPreferences[
            preference.name as keyof typeof formData.accommodationPreferences
          ]

        return (
          <Card
            key={preference.name}
            className={`cursor-pointer transition-all ${
              isChecked
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => handlePreferenceChange(preference.name, !isChecked)}
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

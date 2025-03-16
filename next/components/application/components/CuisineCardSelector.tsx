import React from "react"
import {
  Check,
  Utensils,
  Coffee,
  Soup,
  Beef,
  ThermometerSnowflake,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FlagComponent } from "./PhoneInput"
import { Country } from "react-phone-number-input"

// Определение типов для кухни
type CuisineType = {
  name: string
  label: string
  description: string
  icon: React.ReactNode
  country?: string
}

// Список типов кухни с иконками и описанием
export const cuisines: CuisineType[] = [
  {
    name: "chinese",
    label: "Китайская кухня",
    description: "Традиционные блюда разных регионов Китая",
    icon: <Utensils className="h-5 w-5" />,
    country: "CN",
  },
  {
    name: "european",
    label: "Европейская кухня",
    description: "Блюда из Италии, Франции и других стран Европы",
    icon: <Utensils className="h-5 w-5" />,
    country: "EU",
  },
  {
    name: "japanese",
    label: "Японская кухня",
    description: "Суши, роллы и другие традиционные блюда Японии",
    icon: <Soup className="h-5 w-5" />,
    country: "JP",
  },
  {
    name: "russian",
    label: "Русская кухня",
    description: "Традиционные русские блюда и закуски",
    icon: <Coffee className="h-5 w-5" />,
    country: "RU",
  },
  {
    name: "other",
    label: "Другое",
    description: "Другие национальные кухни и предпочтения",
    icon: <Utensils className="h-5 w-5" />,
  },
]

interface CuisineCardSelectorProps {
  formData: any
  handleCuisineChange: (name: string, checked: boolean) => void
}

export function CuisineCardSelector({
  formData,
  handleCuisineChange,
}: CuisineCardSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {cuisines.map((cuisine) => {
        const isChecked =
          formData.foodPreferences?.cuisine?.[
            cuisine.name as keyof typeof formData.foodPreferences.cuisine
          ]

        return (
          <Card
            key={cuisine.name}
            className={`cursor-pointer transition-all ${
              isChecked
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => handleCuisineChange(cuisine.name, !isChecked)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-start">
                <div className={`p-2 rounded-full mb-2`}>
                  {cuisine.country && (
                    <FlagComponent
                      country={cuisine.country as Country}
                      countryName={cuisine.label}
                    />
                  )}
                </div>
                <p className="font-medium">{cuisine.label}</p>
                <p className="text-xs text-muted-foreground">
                  {cuisine.description}
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

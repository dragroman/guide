import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { absoluteUrl } from "@shared/lib/utils"
import { CityPrices, TCityFull } from "../model/types"
import { AveragePrices } from "./AveragePrices"

export const CityFull = async ({ city }: { city: TCityFull }) => {
  const cityPrices: CityPrices = {
    apt_1bed_center: city.field_apt_1bed_center,
    apt_1bed_outside: city.field_apt_1bed_outside,
    apt_3bed_center: city.field_apt_3bed_center,
    apt_3bed_outside: city.field_apt_3bed_outside,
    avg_monthly_salary: city.field_avg_monthly_salary,
    cigarettes: city.field_cigarettes,
    gas_1l: city.field_gas_1l,
    meal_cheap: city.field_meal_cheap,
    meal_mid: city.field_meal_mid,
  }
  return (
    <>
      {/* Обложка города */}
      <Card className="overflow-hidden">
        <div className="relative h-64">
          <Image
            fill
            className="object-cover"
            src={absoluteUrl(city.field_image.uri.url)}
            alt={city.name}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full text-white">
            <div className="text-white font-bold text-lg">
              {city.field_title_cn}
            </div>
            <CardTitle className="text-3xl font-bold drop-shadow-lg">
              {city.name}
            </CardTitle>
            {city.field_country && (
              <Badge variant="secondary" className="mt-2">
                {city.field_country}
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="pt-6">
          {city.field_select_text && (
            <div
              className="text-muted-foreground text-base"
              dangerouslySetInnerHTML={{ __html: city.field_select_text }}
            />
          )}
        </CardContent>
      </Card>
      <AveragePrices prices={cityPrices} />
    </>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { absoluteUrl } from "@shared/lib/utils"
import { TCityFull } from "../model/types"
import { getCityLabels } from "../lib/constants"

export const CityFull = async ({ city }: { city: TCityFull }) => {
  const labels = getCityLabels(city)
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
      {/* Блок ресторанов */}

      {/* Блок средних цен */}
      <div className="text-xl">Средние цены</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {labels.map(
          (item) =>
            item.value && (
              <div className="border p-4 shadow-sm rounded-md" key={item.label}>
                <div className="font-medium text-sm text-muted-foreground ">
                  {item.label}
                </div>
                <div className="font-bold text-xl">
                  {Math.round(item.value).toLocaleString()} ¥
                </div>
              </div>
            )
        )}
      </div>
      {city.field_comment && (
        <Card>
          <CardHeader>
            <CardTitle>Комментарий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">{city.field_comment}</div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

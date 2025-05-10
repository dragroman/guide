import { drupal } from "@/lib/drupal"
import { absoluteUrl } from "@/lib/utils"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function CityDetail({
  params,
}: {
  params: Promise<{ machine_name: string }>
}) {
  const { machine_name } = await params
  const city = await drupal.getResourceByPath(`/location/${machine_name}`, {
    params: {
      include: "field_image",
    },
  })

  const labels = [
    { label: "1-комн. центр", value: city.field_apt_1bed_center },
    { label: "1-комн. вне центра", value: city.field_apt_1bed_outside },
    { label: "3-комн. центр", value: city.field_apt_3bed_center },
    { label: "3-комн. вне центра", value: city.field_apt_3bed_outside },
    { label: "Средняя зарплата", value: city.field_avg_monthly_salary },
    { label: "Сигареты", value: city.field_cigarettes },
    { label: "Бензин 1л", value: city.field_gas_1l },
    { label: "Обед (дёшево)", value: city.field_meal_cheap },
    { label: "Обед (средний)", value: city.field_meal_mid },
  ]

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-8">
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
    </div>
  )
}

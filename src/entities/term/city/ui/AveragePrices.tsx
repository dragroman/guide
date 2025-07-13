import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { CityPrices } from "../model/types"

type AveragePricesProps = {
  prices: CityPrices
}

type PriceItem = {
  label: string
  value?: number
}

const PriceCard = ({ label, value }: PriceItem) => {
  if (!value) return null

  return (
    <div className="border p-4 shadow-sm rounded-md">
      <div className="font-medium text-sm text-muted-foreground">{label}</div>
      <div className="font-bold text-xl">
        {Math.round(value).toLocaleString()} ¥
      </div>
    </div>
  )
}

export const AveragePrices = ({ prices }: AveragePricesProps) => {
  const priceItems: PriceItem[] = [
    { label: "1-комн. центр", value: prices.apt_1bed_center },
    { label: "1-комн. вне центра", value: prices.apt_1bed_outside },
    { label: "3-комн. центр", value: prices.apt_3bed_center },
    { label: "3-комн. вне центра", value: prices.apt_3bed_outside },
    { label: "Средняя зарплата", value: prices.avg_monthly_salary },
    { label: "Сигареты", value: prices.cigarettes },
    { label: "Бензин 1л", value: prices.gas_1l },
    { label: "Обед (дёшево)", value: prices.meal_cheap },
    { label: "Обед (средний)", value: prices.meal_mid },
  ]

  // Фильтруем только элементы с данными
  const validPrices = priceItems.filter((item) => item.value)

  if (validPrices.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Средние цены</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {validPrices.map((item, index) => (
            <PriceCard key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { TApplicationFull } from "../../model/types"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Calendar, Clock } from "lucide-react"
import { format, parseISO, differenceInDays } from "date-fns"
import { ru } from "date-fns/locale"
import { Badge } from "@shared/ui/badge"

export const SectionDates = ({ node }: { node: TApplicationFull }) => {
  const dateFrom = node.field_date_from ? parseISO(node.field_date_from) : null
  const dateTo = node.field_date_to ? parseISO(node.field_date_to) : null

  const getDaysText = (days: number) => {
    if (days % 10 === 1 && days % 100 !== 11) return "день"
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100))
      return "дня"
    return "дней"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Даты поездки
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Начало поездки</h4>
            <p className="text-gray-600">
              {dateFrom
                ? format(dateFrom, "dd MMMM yyyy", { locale: ru })
                : "Не указано"}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">Окончание поездки</h4>
            <p className="text-gray-600">
              {dateTo
                ? format(dateTo, "dd MMMM yyyy", { locale: ru })
                : "Не указано"}
            </p>
          </div>
        </div>

        {node.field_days_count && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">
              {node.field_days_count} {getDaysText(node.field_days_count)}
            </span>
          </div>
        )}

        {node.field_purpose && (
          <div>
            <h4 className="font-medium text-gray-900">Цель поездки</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {node.field_purpose.map((purpose: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {purpose}
                </Badge>
              ))}
            </div>
            {node.field_purpose_other && (
              <p className="text-gray-600 mt-2 italic">
                {node.field_purpose_other}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

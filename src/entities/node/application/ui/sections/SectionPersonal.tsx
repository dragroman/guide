import { TApplicationFull } from "../../model/types"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { Users, User } from "lucide-react"

export const SectionPersonal = ({ node }: { node: TApplicationFull }) => {
  const totalPeople =
    (node.field_adults || 0) +
    (node.field_children || 0) +
    (node.field_teens || 0) +
    (node.field_toddlers || 0) +
    (node.field_infants || 0) +
    (node.field_seniors || 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Информация о путешественниках
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900">Имя</h4>
          <p className="text-gray-600">{node.field_name}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-900">Общее количество</h4>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-lg font-semibold">{totalPeople} чел.</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {node.field_adults > 0 && (
            <Badge variant="outline">Взрослые: {node.field_adults}</Badge>
          )}
          {node.field_teens > 0 && (
            <Badge variant="outline">Подростки: {node.field_teens}</Badge>
          )}
          {node.field_children > 0 && (
            <Badge variant="outline">Дети: {node.field_children}</Badge>
          )}
          {node.field_toddlers > 0 && (
            <Badge variant="outline">Малыши: {node.field_toddlers}</Badge>
          )}
          {node.field_infants > 0 && (
            <Badge variant="outline">Младенцы: {node.field_infants}</Badge>
          )}
          {node.field_seniors > 0 && (
            <Badge variant="outline">Пожилые: {node.field_seniors}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

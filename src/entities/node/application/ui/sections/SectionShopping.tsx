import { TApplicationFull } from "../../model/types"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { ShoppingBag } from "lucide-react"

export const SectionShopping = ({ node }: { node: TApplicationFull }) => {
  const hasShopping =
    node.field_shopping_budget ||
    node.field_shopping_places?.length > 0 ||
    node.field_shopping_time ||
    node.field_shopping_special_wishes

  if (!hasShopping) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Шоппинг
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {node.field_shopping_budget && (
          <div>
            <h4 className="font-medium text-gray-900">Бюджет</h4>
            <Badge variant="outline">{node.field_shopping_budget}</Badge>
          </div>
        )}

        {node.field_shopping_places?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900">Места для покупок</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {node.field_shopping_places.map(
                (place: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {place}
                  </Badge>
                )
              )}
            </div>
            {node.field_shopping_places_other && (
              <p className="text-gray-600 mt-2 italic">
                {node.field_shopping_places_other}
              </p>
            )}
          </div>
        )}

        {node.field_shopping_time && (
          <div>
            <h4 className="font-medium text-gray-900">Время на шоппинг</h4>
            <Badge variant="outline">{node.field_shopping_time}</Badge>
          </div>
        )}

        {node.field_shopping_special_wishes && (
          <div>
            <h4 className="font-medium text-gray-900">Особые пожелания</h4>
            <p className="text-gray-600 p-3 bg-gray-50 rounded-lg">
              {node.field_shopping_special_wishes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

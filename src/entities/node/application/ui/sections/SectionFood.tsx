import { TApplicationFull } from "../../model/types"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { UtensilsCrossed } from "lucide-react"

export const SectionFood = ({ node }: { node: TApplicationFull }) => {
  const hasFood =
    node.field_cuisines?.length > 0 || node.field_food_preferences?.length > 0

  if (!hasFood) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5" />
          Питание
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {node.field_cuisines?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900">Предпочтения по кухне</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {node.field_cuisines.map((cuisine: string, index: number) => (
                <Badge key={index} variant="outline">
                  {cuisine}
                </Badge>
              ))}
            </div>
            {node.field_cuisines_other && (
              <p className="text-gray-600 mt-2 italic">
                {node.field_cuisines_other}
              </p>
            )}
          </div>
        )}

        {node.field_food_preferences?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900">Особые требования</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {node.field_food_preferences.map(
                (pref: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {pref}
                  </Badge>
                )
              )}
            </div>
            {node.field_food_preferences_other && (
              <p className="text-gray-600 mt-2 italic">
                {node.field_food_preferences_other}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

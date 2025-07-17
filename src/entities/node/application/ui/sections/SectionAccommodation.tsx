import { TApplicationFull } from "../../model/types"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { Home, Coffee } from "lucide-react"

export const SectionAccommodation = ({ node }: { node: TApplicationFull }) => {
  if (!node.field_accommodation?.length) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Размещение
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900">Тип размещения</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {node.field_accommodation.map((acc: string, index: number) => (
              <Badge key={index} variant="outline">
                {acc}
              </Badge>
            ))}
          </div>
          {node.field_accommodation_other && (
            <p className="text-gray-600 mt-2 italic">
              {node.field_accommodation_other}
            </p>
          )}
        </div>

        {node.field_accommodation_preferences?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900">Предпочтения</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {node.field_accommodation_preferences.map(
                (pref: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {pref}
                  </Badge>
                )
              )}
            </div>
            {node.field_accommodation_pref_other && (
              <p className="text-gray-600 mt-2 italic">
                {node.field_accommodation_pref_other}
              </p>
            )}
          </div>
        )}

        {node.field_need_breakfast && (
          <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
            <Coffee className="h-4 w-4 text-orange-600" />
            <span className="text-orange-900">Завтрак включен</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

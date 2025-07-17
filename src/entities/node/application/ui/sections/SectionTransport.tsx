import { TApplicationFull } from "../../model/types"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { Car } from "lucide-react"

export const SectionTransport = ({ node }: { node: TApplicationFull }) => {
  const hasTransport =
    node.field_transport_transfer?.length > 0 ||
    node.field_transport_preferences?.length > 0

  if (!hasTransport) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Транспорт
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {node.field_transport_transfer?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900">Трансфер</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {node.field_transport_transfer.map(
                (transfer: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {transfer}
                  </Badge>
                )
              )}
            </div>
            {node.field_transport_transfer_other && (
              <p className="text-gray-600 mt-2 italic">
                {node.field_transport_transfer_other}
              </p>
            )}
          </div>
        )}

        {node.field_transport_preferences?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900">
              Предпочтения по транспорту
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {node.field_transport_preferences.map(
                (pref: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {pref}
                  </Badge>
                )
              )}
            </div>
            {node.field_transport_pref_other && (
              <p className="text-gray-600 mt-2 italic">
                {node.field_transport_pref_other}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import { TApplicationTeaser } from "../model/types"
import { ReactNode } from "react"
import { Button } from "@shared/ui/button"
import Link from "next/link"

import { Plane, Target, Users } from "lucide-react"
import { Badge } from "@shared/ui/badge"

export const ApplicationTeaser = ({
  node,
  actions,
}: {
  node: TApplicationTeaser
  actions?: ReactNode
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  }

  return (
    <Card className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          {/* Левая секция с датами */}
          <div className="w-32 bg-blue-50 p-4 flex flex-col justify-center items-center">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {formatDate(node.field_date_from)}
              </div>
              <div className="my-2">
                <Plane className="h-4 w-4 text-gray-400 mx-auto" />
              </div>
              <div className="text-lg font-bold text-blue-600">
                {formatDate(node.field_date_to)}
              </div>
            </div>
          </div>

          {/* Основная информация */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">
                {node.field_cities.slice(0, 2).map((item, index) => (
                  <span key={item.id + index}>
                    {item.name}
                    {index < Math.min(node.field_cities.length - 1, 1) && ", "}
                  </span>
                ))}
                {node.field_cities.length > 3 && "..."}
              </h3>
              <Badge className="bg-green-100 text-green-800">
                {node.field_days_count} дней
              </Badge>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{node.field_people_count} чел.</span>
              </div>
              {node.field_purpose.length > 0 && (
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>{node.field_purpose[0]}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {node.field_purpose.slice(1, 3).map((purpose, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {purpose}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                {actions}
                <Button asChild size="sm">
                  <Link
                    href={`/dashboard/application/${node.drupal_internal__nid}`}
                  >
                    Открыть
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

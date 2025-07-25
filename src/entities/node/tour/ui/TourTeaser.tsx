import { ArrowRight, Badge, ChefHat, Clock, Star } from "lucide-react"
import { TTourTeaser } from "../model/types"
import { Button } from "@shared/ui/button"
import Link from "next/link"

export const TourTeaser = ({ node }: { node: TTourTeaser }) => {
  return (
    <Link
      href={`/dashboard/tour/${node.drupal_internal__nid}`}
      className="flex items-center gap-3 p-4 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
    >
      {/* Аватар места */}
      <div className="relative w-14 h-14 flex-shrink-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <ChefHat className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      {/* Основная информация */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-base line-clamp-1 text-gray-900">
            {node.title}
          </h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600">4.8</span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-600 line-clamp-1">
            {node.field_address_cn}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Открыто</span>
            </div>
            <div>{node.field_participants.id}</div>
          </div>
        </div>
      </div>

      {/* Кнопка действия */}
      <Button variant="ghost" size="sm" className="p-2 flex-shrink-0">
        <ArrowRight className="h-4 w-4 text-gray-400" />
      </Button>
    </Link>
  )
}

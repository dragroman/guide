import Link from "next/link"
import { TSpotDefaultTeaser } from "../model/types"
import { Camera, ExternalLink, Heart, Star } from "lucide-react"
import { Button } from "@shared/ui/button"
import { Badge } from "@shared/ui/badge"
import Image from "next/image"
import { absoluteUrl } from "@shared/lib/utils"
import { ReactNode } from "react"

export const SpotTeaser = ({
  node,
  favorite,
}: {
  node: TSpotDefaultTeaser
  favorite: ReactNode
}) => {
  const cuisineTypes = node.field_cuisine_type?.length
    ? Array.from(new Set(node.field_cuisine_type)).slice(0, 1)
    : []
  return (
    <Link href={`/spot/${node.drupal_internal__nid}`} className="block group">
      <div className="space-y-3">
        {/* Изображение */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="absolute inset-0 flex items-center justify-center">
            {node.field_images?.[0]?.field_media_image?.uri?.url ? (
              <Image
                src={absoluteUrl(
                  node.field_images[0].field_media_image.uri.url
                )}
                alt={
                  node.field_images[0].field_media_image.resourceIdObjMeta
                    ?.alt || node.title
                }
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover w-full h-full"
                priority={false}
                quality={75}
              />
            ) : (
              <Camera className="h-12 w-12 text-gray-400" />
            )}
          </div>

          {/* Оверлей с hover эффектом */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

          {/* Иконки в углах */}
          <div
            className="absolute top-3 right-3 z-50"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            {favorite}
          </div>

          {cuisineTypes.length > 0 && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-white/90 text-gray-800 text-xs">
                {cuisineTypes[0]}
              </Badge>
            </div>
          )}
        </div>

        {/* Информация */}
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:underline">
              {node.title}
            </h3>
            <div className="flex items-center gap-1 ml-2">
              <Star className="h-4 w-4 text-gray-900 fill-current" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-1">
            {node.field_address_cn}
          </p>

          <div className="flex items-center justify-between pt-1">
            <div className="text-sm text-gray-500">
              {node.field_opening_hours?.length
                ? "Открыто сегодня"
                : "Уточнить часы"}
            </div>
            <div className="flex items-center gap-2">
              {node.field_map_link?.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 p-1"
                  onClick={(e) => e.preventDefault()}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

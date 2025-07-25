import { ReactNode } from "react"
import { TSpotDefaultFull } from "../model/types"
import {
  Camera,
  ChevronLeft,
  Globe,
  MapPin,
  MoreHorizontal,
} from "lucide-react"
import { Badge } from "@shared/ui/badge"
import { Button } from "@shared/ui/button"
import { BackButton } from "@shared/ui/back-button"
import Image from "next/image"
import { absoluteUrl } from "@shared/lib/utils"

export const SpotFull = ({
  node,
  actions,
}: {
  node: TSpotDefaultFull
  actions: ReactNode
}) => {
  const cuisineTypes = node.field_cuisine_type?.length
    ? Array.from(new Set(node.field_cuisine_type)).slice(0, 1)
    : []

  return (
    <div className="relative w-full h-screen max-h-[600px] overflow-hidden bg-white">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="absolute inset-0 flex items-center justify-center">
          {node.field_images ? (
            <Image
              src={absoluteUrl(node.field_images[0].field_media_image.uri.url)}
              alt={
                node.field_images[0].field_media_image.resourceIdObjMeta?.alt ||
                node.title
              }
              fill
              className="w-12 h-12"
            />
          ) : (
            <Camera className="h-12 w-12 text-gray-400" />
          )}
        </div>
      </div>

      {/* Градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Контент поверх изображения */}
      <div className="absolute inset-0 flex flex-col">
        {/* Верхняя панель */}
        <div className="flex items-center justify-between p-4 pt-8">
          <div className="flex gap-2">
            <BackButton
              variant="link"
              className="[&_svg]:size-6 text-white/65 hover:text-white"
            >
              <ChevronLeft />
            </BackButton>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 p-2"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Основной контент внизу */}
        <div className="mt-auto p-6 space-y-4">
          {/* Рейтинг */}
          <div className="flex items-center gap-2">
            {cuisineTypes.slice(0, 2).map((cuisine, index) => (
              <Badge key={index}>{cuisine}</Badge>
            ))}
          </div>

          {/* Заголовок и описание */}
          <div className="space-y-2">
            <h1 className="text-white text-2xl font-bold line-clamp-2">
              {node.title}
            </h1>
            <p className="text-white/90 text-base line-clamp-2">
              {node.field_name_cn}
            </p>
          </div>

          {/* Локация */}
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4" />
            <span className="text-sm line-clamp-1">
              {node.field_address_cn}
            </span>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 bg-white text-black hover:bg-white/90 font-medium rounded-full">
              Посмотреть детали
            </Button>
            <Button
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30 border-0 backdrop-blur-sm rounded-full px-6"
            >
              <Globe className="h-4 w-4 mr-2" />
              Карта
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

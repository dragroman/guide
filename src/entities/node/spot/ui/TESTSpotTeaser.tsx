import React from "react"
import { TSpotDefaultTeaser } from "../model/types"
import {
  MapPin,
  Clock,
  Star,
  Heart,
  ExternalLink,
  Phone,
  Globe,
  ChefHat,
  Camera,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@shared/ui/badge"
import { Button } from "@shared/ui/button"
import { Card, CardContent } from "@shared/ui/card"
import Image from "next/image"
import Link from "next/link"

// Вариант 1: Карточный стиль в стиле Headout/TripAdvisor
export const SpotTeaserCard = ({ node }: { node: TSpotDefaultTeaser }) => {
  const formatOpeningHours = () => {
    if (!node.field_opening_hours?.length) return "Уточнить часы работы"

    const today = new Date().getDay()
    const todayHours = node.field_opening_hours.find(
      (h: any) => h.day === today
    )

    if (!todayHours) return "Сегодня закрыто"
    if (todayHours.all_day) return "Круглосуточно"

    const formatTime = (time: number) => {
      const hours = Math.floor(time / 100)
      const minutes = time % 100
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    }

    return `${formatTime(todayHours.starthours)} - ${formatTime(todayHours.endhours)}`
  }

  const cuisineTypes = node.field_cuisine_type?.length
    ? Array.from(new Set(node.field_cuisine_type)).slice(0, 2)
    : []

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-md">
      <div className="relative">
        {/* Изображение с градиентом */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <div className="absolute top-3 right-3 z-20">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20 p-2"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-3 left-3 z-20">
            <div className="flex gap-1">
              {cuisineTypes.map((cuisine, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/90 text-gray-800 text-xs"
                >
                  <ChefHat className="h-3 w-3 mr-1" />
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>
          {/* Заглушка для изображения */}
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Camera className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        {/* Контент */}
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                {node.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {node.field_name_cn}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="line-clamp-1">{node.field_address_cn}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{formatOpeningHours()}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-current"
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">(4.8)</span>
              </div>
              <Button size="sm" className="ml-auto">
                Подробнее
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

// Вариант 2: Горизонтальный лист в стиле Booking.com
export const SpotTeaserHorizontal = ({
  node,
}: {
  node: TSpotDefaultTeaser
}) => {
  const cuisineTypes = node.field_cuisine_type?.length
    ? Array.from(new Set(node.field_cuisine_type)).slice(0, 2)
    : []

  return (
    <div className="flex bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden">
      {/* Изображение */}
      <div className="relative w-64 h-48 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <Camera className="h-8 w-8 text-gray-400" />
        </div>
        <div className="absolute top-3 left-3">
          <Badge className="bg-green-500 text-white text-xs">
            Открыто сейчас
          </Badge>
        </div>
      </div>

      {/* Контент */}
      <div className="flex-1 p-6">
        <div className="flex justify-between h-full">
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                {node.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-1 mt-1">
                {node.field_name_cn}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {cuisineTypes.slice(0, 3).map((cuisine, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cuisine}
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="line-clamp-1">{node.field_address_cn}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="line-clamp-1">{node.field_phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">4.8</span>
                <span className="text-gray-500 text-sm">(127 отзывов)</span>
              </div>
            </div>
          </div>

          {/* Правая секция с кнопками */}
          <div className="flex flex-col justify-between items-end ml-6">
            <div className="text-right">
              <div className="text-sm text-gray-500">от</div>
              <div className="text-2xl font-bold text-gray-900">¥180</div>
              <div className="text-sm text-gray-500">за человека</div>
            </div>

            <div className="space-y-2">
              <Button className="w-full">Посмотреть детали</Button>
              <Button variant="outline" size="sm" className="w-full">
                <Globe className="h-4 w-4 mr-1" />
                На карте
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Вариант 3: Минималистичный стиль в духе Airbnb
export const SpotTeaserMinimal = ({ node }: { node: TSpotDefaultTeaser }) => {
  const cuisineTypes = node.field_cuisine_type?.length
    ? Array.from(new Set(node.field_cuisine_type)).slice(0, 2)
    : []

  return (
    <Link href={`/spot/${node.path.alias}`} className="block group">
      <div className="space-y-3">
        {/* Изображение */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="h-12 w-12 text-gray-400" />
          </div>

          {/* Оверлей с hover эффектом */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

          {/* Иконки в углах */}
          <div className="absolute top-3 right-3">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-600 hover:text-red-500 hover:bg-white/80 p-2 backdrop-blur-sm"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-4 w-4" />
            </Button>
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

// Основной экспортируемый компонент с выбором варианта
export const SpotTeaser = ({
  node,
  variant = "card",
}: {
  node: TSpotDefaultTeaser
  variant?: "card" | "horizontal" | "minimal"
}) => {
  switch (variant) {
    case "horizontal":
      return <SpotTeaserHorizontal node={node} />
    case "minimal":
      return <SpotTeaserMinimal node={node} />
    case "card":
    default:
      return <SpotTeaserCard node={node} />
  }
}

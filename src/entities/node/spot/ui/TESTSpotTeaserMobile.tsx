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
  Navigation,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react"
import { Badge } from "@shared/ui/badge"
import { Button } from "@shared/ui/button"
import { Card, CardContent } from "@shared/ui/card"
import { cn } from "@shared/lib/utils"
import Image from "next/image"
import Link from "next/link"

// Вариант 1: Мобильная карточка-история (Instagram Stories style)
export const SpotTeaserStory = ({ node }: { node: TSpotDefaultTeaser }) => {
  const cuisineTypes = node.field_cuisine_type?.length
    ? Array.from(new Set(node.field_cuisine_type)).slice(0, 2)
    : []

  return (
    <div className="w-full max-w-sm mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg rounded-3xl bg-white">
        {/* Изображение на всю ширину */}
        <div className="relative h-64 sm:h-80">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Camera className="h-16 w-16 text-gray-400" />
          </div>

          {/* Градиент сверху */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

          {/* Топ-бар с действиями */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex gap-2">
              {cuisineTypes.map((cuisine, index) => (
                <Badge
                  key={index}
                  className="bg-white/20 text-white border-0 backdrop-blur-sm text-xs"
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Рейтинг внизу изображения */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white font-medium text-sm">4.8</span>
            </div>
          </div>
        </div>

        {/* Контент */}
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-lg line-clamp-2 mb-1">
              {node.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-1">
              {node.field_name_cn}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{node.field_address_cn}</span>
          </div>

          {/* Кнопки действий в строку */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1 rounded-full" size="sm">
              <ArrowRight className="h-4 w-4 mr-1" />
              Подробнее
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-3">
              <Navigation className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full px-3">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Вариант 2: Компактный список для мобильных (WhatsApp/Telegram style)
export const SpotTeaserCompact = ({ node }: { node: TSpotDefaultTeaser }) => {
  const cuisineType = node.field_cuisine_type?.[0]

  return (
    <div className="flex items-center gap-3 p-4 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0">
      {/* Аватар места */}
      <div className="relative w-14 h-14 flex-shrink-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <ChefHat className="h-6 w-6 text-gray-400" />
        </div>
        {cuisineType && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )}
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
            {cuisineType && (
              <Badge variant="secondary" className="text-xs py-0 px-2 h-5">
                {cuisineType}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка действия */}
      <Button variant="ghost" size="sm" className="p-2 flex-shrink-0">
        <ArrowRight className="h-4 w-4 text-gray-400" />
      </Button>
    </div>
  )
}

// Вариант 3: Полноэкранная карточка для мобильных (TikTok/Reels style)
export const SpotTeaserFullscreen = ({
  node,
}: {
  node: TSpotDefaultTeaser
}) => {
  const cuisineTypes = node.field_cuisine_type?.length
    ? Array.from(new Set(node.field_cuisine_type)).slice(0, 2)
    : []

  return (
    <div className="relative w-full h-screen max-h-[600px] rounded-t-3xl overflow-hidden bg-white shadow-2xl">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera className="h-20 w-20 text-gray-400" />
        </div>
      </div>

      {/* Градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Контент поверх изображения */}
      <div className="absolute inset-0 flex flex-col">
        {/* Верхняя панель */}
        <div className="flex items-center justify-between p-4 pt-8">
          <div className="flex gap-2">
            {cuisineTypes.slice(0, 2).map((cuisine, index) => (
              <Badge
                key={index}
                className="bg-white/20 text-white border-0 backdrop-blur-sm"
              >
                {cuisine}
              </Badge>
            ))}
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
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-white font-medium">4.8</span>
            <span className="text-white/70 text-sm">(127 отзывов)</span>
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

// Вариант 4: Swipe-карточка (Tinder style)
export const SpotTeaserSwipe = ({ node }: { node: TSpotDefaultTeaser }) => {
  const cuisineTypes = node.field_cuisine_type?.length
    ? Array.from(new Set(node.field_cuisine_type)).slice(0, 2)
    : []

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <Card className="overflow-hidden rounded-3xl border-0 shadow-xl bg-white transform hover:scale-[1.02] transition-transform duration-200">
        {/* Изображение */}
        <div className="relative h-72">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
            <Camera className="h-16 w-16 text-gray-400" />
          </div>

          {/* Индикатор статуса */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Открыто сейчас
            </div>
          </div>

          {/* Кнопка избранного */}
          <div className="absolute top-4 right-4">
            <Button
              size="sm"
              variant="ghost"
              className="h-10 w-10 p-0 text-white hover:bg-black/20 rounded-full backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Информация поверх изображения */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-white space-y-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">4.8</span>
                <span className="text-white/80 text-sm ml-1">(127)</span>
              </div>

              <h3 className="font-bold text-lg line-clamp-2">{node.title}</h3>
            </div>
          </div>
        </div>

        {/* Контент карточки */}
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {cuisineTypes.map((cuisine, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {cuisine}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-gray-700 text-sm line-clamp-2">
              {node.field_name_cn}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="line-clamp-1">{node.field_address_cn}</span>
            </div>
          </div>

          {/* Swipe действия */}
          <div className="flex gap-4 pt-3">
            <Button
              variant="outline"
              className="flex-1 rounded-full border-red-200 text-red-600 hover:bg-red-50"
            >
              <span className="text-lg mr-2">✕</span>
              Пропустить
            </Button>
            <Button className="flex-1 rounded-full bg-green-500 hover:bg-green-600">
              <span className="text-lg mr-2">♥</span>
              Нравится
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Вариант 5: Умная адаптивная карточка
export const SpotTeaserAdaptive = ({ node }: { node: TSpotDefaultTeaser }) => {
  return (
    <div className="w-full">
      {/* Мобильная версия (до md) */}
      <div className="block md:hidden">
        <SpotTeaserCompact node={node} />
      </div>

      {/* Планшетная версия (md до lg) */}
      <div className="hidden md:block lg:hidden">
        <SpotTeaserStory node={node} />
      </div>

      {/* Десктопная версия (lg и больше) */}
      <div className="hidden lg:block">
        <SpotTeaserSwipe node={node} />
      </div>
    </div>
  )
}

// Основной экспортируемый компонент
export const SpotTeaserMobile = ({
  node,
  variant = "story",
}: {
  node: TSpotDefaultTeaser
  variant?: "story" | "compact" | "fullscreen" | "swipe" | "adaptive"
}) => {
  switch (variant) {
    case "compact":
      return <SpotTeaserCompact node={node} />
    case "fullscreen":
      return <SpotTeaserFullscreen node={node} />
    case "swipe":
      return <SpotTeaserSwipe node={node} />
    case "adaptive":
      return <SpotTeaserAdaptive node={node} />
    case "story":
    default:
      return <SpotTeaserStory node={node} />
  }
}

"use client"
import React, { useState } from "react"
import {
  X,
  Star,
  Clock,
  MapPin,
  CircleDollarSign,
  Map,
  MapIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Restaurant {
  name: string
  category: string
  cuisine?: string
  rating?: number
  hours: string
  avgPrice: string
  address: string
  directions: string
  travelTime: string
  popularDishes?: string
  tips?: string
  baiduUrl?: string
  omapsUrl?: string
  description: string
}

interface RestaurantDetailProps {
  restaurant: Restaurant
  onClose: () => void
  open?: boolean
}

export const RestaurantDetail = ({
  restaurant,
  onClose,
  open = true,
}: RestaurantDetailProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto sm:rounded-lg">
        <DialogHeader className="border-b pb-2 mb-4 text-left">
          <DialogTitle className="text-xl">{restaurant.name}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{restaurant.category}</Badge>
            {restaurant.cuisine && (
              <Badge variant="outline" className="bg-blue-50">
                {restaurant.cuisine}
              </Badge>
            )}
            {restaurant.rating && (
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-sm">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
            )}
          </div>
        </DialogHeader>

        {/* Описание */}
        <p className="text-gray-700 mb-6">{restaurant.description}</p>

        {/* Детальная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {/* Время работы */}
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Часы работы</h4>
              <p className="text-muted-foreground">{restaurant.hours}</p>
            </div>
          </div>

          {/* Средний чек */}
          <div className="flex items-start">
            <CircleDollarSign className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Средний чек</h4>
              <p className="text-muted-foreground">{restaurant.avgPrice}</p>
            </div>
          </div>

          {/* Адрес */}
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Адрес</h4>
              <p className="text-muted-foreground">{restaurant.address}</p>
            </div>
          </div>

          {/* Как добраться */}
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-muted-foreground mr-3 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
            <div>
              <h4 className="font-medium text-gray-900">Как добраться</h4>
              <p className="text-muted-foreground">{restaurant.directions}</p>
              <p className="text-gray-500 text-sm">{restaurant.travelTime}</p>
            </div>
          </div>
        </div>

        {/* Популярные блюда */}
        {restaurant.popularDishes && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3">Популярные блюда</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="whitespace-pre-line text-muted-foreground">
                  {restaurant.popularDishes}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Советы */}
        {restaurant.tips && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3">Советы</h3>
              <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                <p className="whitespace-pre-line text-muted-foreground">
                  {restaurant.tips}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Кнопки для карт */}
        <h3 className="font-bold text-xl flex items-center">
          <MapIcon className="mr-3" />
          Ссылки на карты
        </h3>
        <div className="flex flex-wrap gap-3 mt-6">
          {restaurant.baiduUrl && (
            <Button variant="outline" size="lg" asChild>
              <a
                href={restaurant.baiduUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Baidu Maps
              </a>
            </Button>
          )}
          {restaurant.omapsUrl && (
            <Button variant="outline" size="lg" asChild>
              <a
                href={restaurant.omapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Organic Maps
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

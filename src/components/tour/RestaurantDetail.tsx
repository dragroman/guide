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
import { DetailInfoItem } from "./DetailInfoItem"

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
          <DetailInfoItem
            icon={Clock}
            title="Часы работы"
            value={restaurant.hours}
          />

          {/* Средний чек */}
          <DetailInfoItem
            icon={CircleDollarSign}
            title="Средний чек"
            value={restaurant.avgPrice}
          />

          {/* Адрес */}
          <DetailInfoItem
            icon={MapPin}
            title="Адрес"
            value={restaurant.address}
          />

          {/* Как добраться */}
          <DetailInfoItem
            icon={Map}
            title="Как добраться"
            value={
              <>
                <div>{restaurant.directions}</div>
                <div className="text-gray-500 text-sm">
                  {restaurant.travelTime}
                </div>
              </>
            }
          />
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

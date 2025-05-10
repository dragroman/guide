"use client"
import React from "react"
import { Clock, MapPin, ShoppingBag, MapIcon, Bus, Tag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DetailInfoItem } from "./DetailInfoItem"

interface ShoppingPlace {
  name: string
  category: string
  address: string
  hours: string
  description: string
  directions: string
  baiduUrl?: string
  omapsUrl?: string
}

interface ShoppingDetailProps {
  shopping: ShoppingPlace
  onClose: () => void
  open?: boolean
}

export const ShoppingDetail = ({
  shopping,
  onClose,
  open = true,
}: ShoppingDetailProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto sm:rounded-lg">
        <DialogHeader className="border-b pb-2 mb-4 text-left">
          <DialogTitle className="text-xl">{shopping.name}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{shopping.category}</Badge>
          </div>
        </DialogHeader>

        {/* Описание */}
        <p className="text-gray-700 mb-6">{shopping.description}</p>

        {/* Детальная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {/* Время работы */}
          <DetailInfoItem
            icon={Clock}
            title="Часы работы"
            value={shopping.hours}
          />

          {/* Категория */}
          <DetailInfoItem
            icon={Tag}
            title="Категория товаров"
            value={shopping.category}
          />

          {/* Адрес */}
          <DetailInfoItem
            icon={MapPin}
            title="Адрес"
            value={shopping.address}
          />

          {/* Как добраться */}
          <DetailInfoItem
            icon={Bus}
            title="Как добраться"
            value={shopping.directions}
          />
        </div>

        {/* Кнопки для карт */}
        <h3 className="font-bold text-xl flex items-center">
          <MapIcon className="mr-3" />
          Ссылки на карты
        </h3>
        <div className="flex flex-wrap gap-3 mt-6">
          {shopping.baiduUrl && (
            <Button variant="outline" size="lg" asChild>
              <a
                href={shopping.baiduUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Baidu Maps
              </a>
            </Button>
          )}
          {shopping.omapsUrl && (
            <Button variant="outline" size="lg" asChild>
              <a
                href={shopping.omapsUrl}
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

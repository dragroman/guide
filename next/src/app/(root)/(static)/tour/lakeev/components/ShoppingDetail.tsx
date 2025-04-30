"use client"
import React from "react"
import {
  Clock,
  MapPin,
  ShoppingBag,
  MapIcon,
  Bus,
  Tag,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ShoppingPlace {
  name: string;
  category: string;
  address: string;
  hours: string;
  description: string;
  directions: string;
  baiduUrl?: string;
  omapsUrl?: string;
}

interface ShoppingDetailProps {
  shopping: ShoppingPlace;
  onClose: () => void;
  open?: boolean;
}

export const ShoppingDetail = ({
  shopping,
  onClose,
  open = true,
}: ShoppingDetailProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto sm:rounded-lg">
        <DialogHeader className="border-b pb-2 mb-4">
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
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Часы работы</h4>
              <p className="text-muted-foreground">{shopping.hours}</p>
            </div>
          </div>

          {/* Категория */}
          <div className="flex items-start">
            <Tag className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Категория товаров</h4>
              <p className="text-muted-foreground">{shopping.category}</p>
            </div>
          </div>

          {/* Адрес */}
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Адрес</h4>
              <p className="text-muted-foreground">{shopping.address}</p>
            </div>
          </div>

          {/* Как добраться */}
          <div className="flex items-start">
            <Bus className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Как добраться</h4>
              <p className="text-muted-foreground">{shopping.directions}</p>
            </div>
          </div>
        </div>

        {/* Кнопки для карт */}
        <h3 className="font-bold text-2xl flex items-center">
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

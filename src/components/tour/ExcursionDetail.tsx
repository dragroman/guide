"use client"
import React from "react"
import {
  Map,
  Clock,
  MapPin,
  CircleDollarSign,
  MapIcon,
  Bus,
  Info,
  AlertTriangle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog"
import { Button } from "@shared/ui/button"
import { Badge } from "@shared/ui/badge"
import { Card, CardContent } from "@shared/ui/card"
import { DetailInfoItem } from "./DetailInfoItem"

interface Excursion {
  name: string
  address: string
  hours: string
  price: string
  description: string
  duration: string
  directions: string
  travelTime: string
  baiduUrl?: string
  omapsUrl?: string
  tips?: string
}

interface ExcursionDetailProps {
  excursion: Excursion
  onClose: () => void
  open?: boolean
}

export const ExcursionDetail = ({
  excursion,
  onClose,
  open = true,
}: ExcursionDetailProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto sm:rounded-lg">
        <DialogHeader className="border-b pb-2 mb-4 text-left">
          <DialogTitle className="text-xl">{excursion.name}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">Достопримечательность</Badge>
          </div>
        </DialogHeader>

        {/* Описание */}
        <p className="text-gray-700 mb-6">{excursion.description}</p>

        {/* Детальная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          {/* Время работы */}
          <DetailInfoItem
            icon={Clock}
            title="Часы работы"
            value={excursion.hours}
          />

          {/* Стоимость */}
          <DetailInfoItem
            icon={CircleDollarSign}
            title="Стоимость билетов"
            value={excursion.price}
          />

          {/* Адрес */}
          <DetailInfoItem
            icon={MapPin}
            title="Адрес"
            value={excursion.address}
          />

          {/* Длительность */}
          <DetailInfoItem
            icon={Info}
            title="Время на экскурсию"
            value={excursion.duration}
          />

          {/* Как добраться */}
          <DetailInfoItem
            icon={Bus}
            title="Как добраться"
            value={
              <>
                <div>{excursion.directions}</div>
                <div className="text-gray-500 text-sm">
                  {excursion.travelTime}
                </div>
              </>
            }
          />
        </div>

        {/* Советы */}
        {excursion.tips && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Советы
              </h3>
              <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
                <p className="whitespace-pre-line text-muted-foreground">
                  {excursion.tips}
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
          {excursion.baiduUrl && (
            <Button variant="outline" size="lg" asChild>
              <a
                href={excursion.baiduUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Baidu Maps
              </a>
            </Button>
          )}
          {excursion.omapsUrl && (
            <Button variant="outline" size="lg" asChild>
              <a
                href={excursion.omapsUrl}
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

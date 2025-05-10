"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Clock, MapPin, ShoppingBag, Building, Store } from "lucide-react"
import { useState } from "react"
import { ShoppingDetail } from "../ShoppingDetail"
import { Button } from "@/components/ui/button"
import { ShoppingData } from "@/types/tour"

export default function TourShopping({
  shoppingData,
}: {
  shoppingData: ShoppingData
}) {
  const [selectedShopping, setSelectedShopping] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleOpenDetail = (shopping: any) => {
    setSelectedShopping(shopping)
    setDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
  }

  // Функция для определения иконки категории
  const getCategoryIcon = (category: string) => {
    if (category.includes("Аутлет")) return <Store className="h-5 w-5" />
    if (category.includes("Сувениры"))
      return <ShoppingBag className="h-5 w-5" />
    return <Building className="h-5 w-5" />
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Шоппинг</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {shoppingData.map((shopping) => (
          <ShoppingCard
            key={shopping.id}
            shopping={shopping}
            onClick={() => handleOpenDetail(shopping)}
            icon={getCategoryIcon(shopping.category)}
          />
        ))}

        {/* Модальное окно с детальной информацией */}
        {selectedShopping && (
          <ShoppingDetail
            shopping={selectedShopping}
            onClose={handleCloseDetail}
            open={detailOpen}
          />
        )}
      </div>
    </div>
  )
}

export const ShoppingCard = ({ shopping, onClick, icon }: any) => {
  // Проверяем, если место можно дойти пешком
  const isWalkable = shopping.directions.toLowerCase().includes("пешком")

  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow cursor-pointer hover:shadow-md",
        "h-full flex flex-col border-gray-100"
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">
            {shopping.name}
          </h3>
          {icon}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant={isWalkable ? "default" : "secondary"}
            className={isWalkable ? "bg-green-100 text-green-800" : ""}
          >
            {shopping.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {shopping.description}
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{shopping.hours}</span>
          </div>

          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
            <span className="line-clamp-1">{shopping.address}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100 mt-auto">
        <div className="flex w-full justify-between">
          <div className="text-sm font-medium text-gray-700 line-clamp-1">
            {shopping.directions}
          </div>
          <Button>Подробнее</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CircleDollarSign, Clock, MapPin, Star } from "lucide-react"
import { useState } from "react"
import { RestaurantDetail } from "../RestaurantDetail"
import { Button } from "@/components/ui/button"
import { RestaurantData } from "@/types/tour"

export default function TourRestaurant({
  restaurantData,
}: {
  restaurantData: RestaurantData
}) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const handleOpenDetail = (restaurant: any) => {
    setSelectedRestaurant(restaurant)
    setDetailOpen(true)
  }
  // Закрыть детальную информацию
  const handleCloseDetail = () => {
    setDetailOpen(false)
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Рестораны</h2>
      <div className="grid grid-cols-1 gap-6 mt-8">
        {restaurantData.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleOpenDetail(restaurant)}
          />
        ))}

        {/* Модальное окно с детальной информацией */}
        {selectedRestaurant && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onClose={handleCloseDetail}
            open={detailOpen}
          />
        )}
      </div>
    </div>
  )
}

export const RestaurantCard = ({ restaurant, onClick }: any) => {
  // Проверка рейтинга (если нет, показываем "Нет оценок")
  const rating = restaurant.rating ? parseFloat(restaurant.rating) : null

  return (
    <Card
      className={cn("overflow-hidden transition-shadow", "border-gray-100")}
      onClick={onClick}
    >
      <CardHeader className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">
            {restaurant.name}
          </h3>
          {rating && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{restaurant.category}</Badge>
          {restaurant.cuisine && (
            <Badge variant="outline" className="bg-blue-50">
              {restaurant.cuisine}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {restaurant.description}
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{restaurant.hours}</span>
          </div>

          <div className="flex items-center">
            <CircleDollarSign className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{restaurant.avgPrice}</span>
          </div>

          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between w-full">
          <div className="text-sm font-medium text-gray-700">
            <div className="text-primary">{restaurant.directions}</div>
            <div>{restaurant.travelTime}</div>
          </div>
          <Button>Подробнее</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

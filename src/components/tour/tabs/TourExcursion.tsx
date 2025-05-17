"use client"
import { Badge } from "@shared/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@shared/ui/card"
import { cn } from "@shared/lib/utils"
import { CircleDollarSign, Clock, MapPin, Info, Ticket } from "lucide-react"
import { useState } from "react"
import { ExcursionDetail } from "../ExcursionDetail"
import { Button } from "@shared/ui/button"
import { ExcursionData } from "@/types/tour"

export default function TourExcursion({
  excursionData,
}: {
  excursionData: ExcursionData
}) {
  const [selectedExcursion, setSelectedExcursion] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleOpenDetail = (excursion: any) => {
    setSelectedExcursion(excursion)
    setDetailOpen(true)
  }

  // Закрыть детальную информацию
  const handleCloseDetail = () => {
    setDetailOpen(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Экскурсии</h2>
      <div className="grid grid-cols-1 gap-6 mt-8">
        {excursionData.map((excursion) => (
          <ExcursionCard
            key={excursion.id}
            excursion={excursion}
            onClick={() => handleOpenDetail(excursion)}
          />
        ))}

        {/* Модальное окно с детальной информацией */}
        {selectedExcursion && (
          <ExcursionDetail
            excursion={selectedExcursion}
            onClose={handleCloseDetail}
            open={detailOpen}
          />
        )}
      </div>
    </div>
  )
}

export const ExcursionCard = ({ excursion, onClick }: any) => {
  // Проверяем, бесплатно ли посещение
  const isFree = excursion.price.toLowerCase().includes("бесплатно")

  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow",
        "border-gray-100",
        "cursor-pointer hover:shadow-md"
      )}
      onClick={onClick}
    >
      <CardHeader className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-2">
            {excursion.name}
          </h3>
          <Badge
            variant={isFree && "success"}
            className={isFree ? "bg-green-100 text-green-800" : ""}
          >
            {isFree ? "Бесплатно" : "Платно"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {excursion.description}
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{excursion.hours}</span>
          </div>

          <div className="flex items-center">
            {isFree ? (
              <Ticket className="h-4 w-4 text-green-600 mr-2" />
            ) : (
              <CircleDollarSign className="h-4 w-4 text-muted-foreground mr-2" />
            )}
            <span className="line-clamp-1">{excursion.price}</span>
          </div>

          <div className="flex items-center">
            <Info className="h-4 w-4 text-muted-foreground mr-2" />
            <span>{excursion.duration}</span>
          </div>

          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
            <span className="line-clamp-1">{excursion.address}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center w-full text-sm justify-between font-medium text-gray-700">
          <div className="text-primary line-clamp-1">
            {excursion.directions}
            <div>{excursion.travelTime}</div>
          </div>
          <Button>Подробнее</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

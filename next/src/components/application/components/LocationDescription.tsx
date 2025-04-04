import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { LocationData } from "./LocationSelect"

interface LocationDescriptionProps {
  value: string
  locationData?: LocationData
}

export function LocationDescription({
  value,
  locationData,
}: LocationDescriptionProps) {
  if (!value || !locationData) return null

  return (
    <Card className="mt-4 overflow-hidden">
      {/* Отображаем изображение, если оно есть */}
      {locationData.image && (
        <div className="relative w-full h-40">
          <Image
            src={absoluteUrl(locationData.image.url)}
            alt={locationData.image.alt || locationData.name}
            fill
            style={{ objectFit: "cover" }}
            className="transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-4">
            <Badge
              variant="secondary"
              className="text-lg font-medium px-3 py-1.5"
            >
              {locationData.name}
            </Badge>
          </div>
        </div>
      )}

      <CardContent className={locationData.image ? "pt-4" : "pt-6"}>
        {!locationData.image && (
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {locationData.name}
            </Badge>
          </div>
        )}
        {/* Отображаем описание, если оно есть */}
        {locationData.field_select_text && (
          <div
            className="text-sm text-muted-foreground mt-2"
            dangerouslySetInnerHTML={{
              __html: locationData.field_select_text,
            }}
          ></div>
        )}
      </CardContent>
    </Card>
  )
}

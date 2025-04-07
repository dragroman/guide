import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { absoluteUrl } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { LocationData } from "./LocationSelect"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface LocationDescriptionProps {
  value: string
  locationData?: LocationData
}

export function LocationDescription({
  value,
  locationData,
}: LocationDescriptionProps) {
  const [imageLoading, setImageLoading] = useState(true)

  if (!value || !locationData) return null

  return (
    <Card className="mt-4 overflow-hidden">
      {locationData.image && (
        <div className="relative w-full h-40">
          {imageLoading && (
            <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={absoluteUrl(locationData.image.url)}
            alt={locationData.image.alt || locationData.name}
            fill
            style={{ objectFit: "cover" }}
            className={`transition-all duration-500 ${
              imageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            onLoadingComplete={() => setImageLoading(false)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <div className="text-4xl text-white font-bold">
              {locationData.name}
            </div>
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
        {locationData.field_select_text && (
          <div
            className=" text-muted-foreground mt-2"
            dangerouslySetInnerHTML={{
              __html: locationData.field_select_text,
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}

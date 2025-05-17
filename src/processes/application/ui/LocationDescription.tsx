// src/components/application/components/LocationDescription.tsx

import { useState } from "react"
import { Card, CardContent } from "@shared/ui/card"
import Image from "next/image"
import { absoluteUrl } from "@shared/lib/utils"
import { Badge } from "@shared/ui/badge"
import { Skeleton } from "@shared/ui/skeleton"
import { useLocationData } from "../hooks/useLocationData"
import { LocationData } from "../model/types"
import { Info } from "lucide-react"
import Link from "next/link"

interface LocationDescriptionProps {
  length?: number
  value: string
  locationData?: LocationData
}

export function LocationDescription({
  length,
  value,
  locationData,
}: LocationDescriptionProps) {
  const [imageLoading, setImageLoading] = useState(true)

  // Если данные не переданы, загружаем их с помощью хука
  const { locationData: fetchedData, isLoading } = useLocationData(
    locationData ? null : value
  )

  // Используем переданные данные или загруженные
  const dataToUse = locationData || fetchedData

  if (!value) return null

  if (isLoading) {
    return (
      <div className="mt-4">
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  console.log(dataToUse)

  if (!dataToUse) return null

  return (
    <Card className="overflow-hidden">
      {dataToUse.image && (
        <div className="relative w-full h-40">
          {imageLoading && (
            <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={absoluteUrl(dataToUse.image.url)}
            alt={dataToUse.image.alt || dataToUse.name}
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
            {dataToUse.field_title_cn && (
              <div
                className={`text-white font-bold ${(length ?? 0) < 1 ? "text-lg" : "text-md"}`}
              >
                {dataToUse.field_title_cn}
              </div>
            )}
            <div
              className={`text-white font-bold ${(length ?? 0) < 1 ? "text-3xl" : "text-xl"}`}
            >
              {dataToUse.name}
            </div>
          </div>
          <div className="absolute top-4 right-6 text-white">
            <Link href={`city/${dataToUse.machine_name}`}>
              <Info />
            </Link>
          </div>
        </div>
      )}

      {(length ?? 0) < 1 && (
        <CardContent className={dataToUse.image ? "pt-4" : "pt-6"}>
          {!dataToUse.image && (
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {dataToUse.name}
              </Badge>
            </div>
          )}
          {dataToUse.field_select_text && (
            <div
              className="text-muted-foreground mt-2"
              dangerouslySetInnerHTML={{
                __html: dataToUse.field_select_text,
              }}
            />
          )}
        </CardContent>
      )}
    </Card>
  )
}

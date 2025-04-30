// components/tours/TourHeader.tsx
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"

interface TourHeaderProps {
  title: string
  subtitle: string
  dates: string
  duration: string
  imagePath: string
  badges: string[]
}

export const TourHeader = ({
  title,
  subtitle,
  dates,
  duration,
  imagePath,
  badges,
}: TourHeaderProps) => {
  return (
    <div className="mb-6">
      <Badge className="mb-2">Для семьи</Badge>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2">{subtitle}</p>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm border mb-6 mt-6">
        <div className="aspect-video relative bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src="https://img.chinq.ru/guide/public/images/city/harbin-spring.jpeg"
            alt="Харбин"
            className="object-cover"
            fill
          />
          <div className="absolute bottom-4 left-4 right-4 text-white z-20">
            <div className="flex flex-col space-y-2 mb-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{dates}</span>
              </div>

              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>{duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-white border-white/50 bg-black/30"
          >
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  )
}

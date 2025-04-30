// components/tours/TourHeader.tsx
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

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
      <Badge className="mb-2">Для семьи: Лакеевы</Badge>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2">{subtitle}</p>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm border mb-6 mt-6">
        <div className="aspect-video relative bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${imagePath}')`,
              backgroundSize: "cover",
            }}
          />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5" />
              <span>{dates}</span>
              <span className="mx-2">•</span>
              <Clock className="h-5 w-5" />
              <span>{duration}</span>
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
        </div>
      </div>
    </div>
  )
}

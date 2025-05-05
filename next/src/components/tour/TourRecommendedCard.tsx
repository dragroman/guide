// components/tours/TourRecommendedCard.tsx
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TourRecommendedCardProps {
  title: string
  description: string
  imagePath: string
  subtitle: string
  onDetailsClick?: () => void
}

export const TourRecommendedCard = ({
  title,
  description,
  imagePath,
  subtitle,
  onDetailsClick,
}: TourRecommendedCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div
        className="h-48 bg-muted bg-cover bg-center"
        style={{ backgroundImage: `url('${imagePath}')` }}
      ></div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onDetailsClick}>
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  )
}

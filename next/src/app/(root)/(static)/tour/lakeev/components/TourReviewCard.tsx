// components/tours/TourReviewCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TourReviewCardProps {
  reviewerName: string
  reviewerInitials: string
  reviewerDescription: string
  reviewText: string
}

export const TourReviewCard = ({
  reviewerName,
  reviewerInitials,
  reviewerDescription,
  reviewText,
}: TourReviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="font-semibold text-primary">
              {reviewerInitials}
            </span>
          </div>
          <div>
            <CardTitle className="text-lg">{reviewerName}</CardTitle>
            <CardDescription>{reviewerDescription}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground italic">{reviewText}</p>
      </CardContent>
    </Card>
  )
}

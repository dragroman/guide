// components/tours/TourCta.tsx
import { Button } from "@/components/ui/button"

interface TourCtaProps {
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export const TourCta = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: TourCtaProps) => {
  return (
    <div className="bg-primary/5 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" onClick={onPrimaryClick}>
          {primaryButtonText}
        </Button>
        <Button size="lg" variant="outline" onClick={onSecondaryClick}>
          {secondaryButtonText}
        </Button>
      </div>
    </div>
  )
}

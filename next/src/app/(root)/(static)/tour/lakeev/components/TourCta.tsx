// components/tours/TourCta.tsx
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

interface TourCtaProps {
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

const contact = {
  phone: "8615545199386",
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
        <a href={`tel:${contact.phone}`} target="_blank">
          <Button size="lg" onClick={onPrimaryClick}>
            <Phone /> {primaryButtonText}
          </Button>
        </a>
        <a
          href={`https://api.whatsapp.com/send/?phone=${contact.phone}`}
          target="_blank"
        >
          <Button size="lg" variant="outline" onClick={onSecondaryClick}>
            {secondaryButtonText}
          </Button>
        </a>
      </div>
    </div>
  )
}

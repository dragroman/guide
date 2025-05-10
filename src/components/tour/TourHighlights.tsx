// components/tours/TourHighlights.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ReactNode } from "react"

interface HighlightProps {
  icon: ReactNode
  title: string
  description: string
}

const Highlight = ({ icon, title, description }: HighlightProps) => {
  return (
    <div className="flex items-start">
      <div className="bg-primary/10 p-2 rounded-full mr-3">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

interface TourHighlightsProps {
  highlights: {
    icon: ReactNode
    title: string
    description: string
  }[]
}

export const TourHighlights = ({ highlights }: TourHighlightsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Особенности тура</CardTitle>
        <CardDescription>Что делает этот тур особенным</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((highlight, index) => (
            <Highlight
              key={index}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

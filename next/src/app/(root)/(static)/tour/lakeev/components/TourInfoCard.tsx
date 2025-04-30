// components/tours/TourInfoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface TourInfoItem {
  title: string
  content: string | string[] | ReactNode
}

interface TourInfoCardProps {
  title: string
  items: TourInfoItem[]
}

export const TourInfoCard = ({ title, items }: TourInfoCardProps) => {
  const renderContent = (content: string | string[] | ReactNode) => {
    if (typeof content === "string") {
      return <p className="text-sm text-muted-foreground">{content}</p>
    }

    if (Array.isArray(content)) {
      return (
        <ul className="text-sm text-muted-foreground list-disc list-inside">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )
    }

    return content
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <h4 className="font-medium">{item.title}</h4>
            {renderContent(item.content)}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

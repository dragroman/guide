// components/tours/TourFeatureCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface TourFeatureCardProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

export const TourFeatureCard = ({
  title,
  icon,
  children,
}: TourFeatureCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        {icon}
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>{children}</div>
      </CardContent>
    </Card>
  )
}

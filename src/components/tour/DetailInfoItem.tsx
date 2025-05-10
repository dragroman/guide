import React from "react"

interface DetailInfoItemProps {
  icon: React.ElementType
  title: string
  value: React.ReactNode
}

export const DetailInfoItem = ({
  icon: Icon,
  title,
  value,
}: DetailInfoItemProps) => (
  <div className="flex items-start">
    <div>
      <Icon className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
    </div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-muted-foreground">{value}</p>
    </div>
  </div>
)

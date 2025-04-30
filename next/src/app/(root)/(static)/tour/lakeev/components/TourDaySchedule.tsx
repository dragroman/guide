// components/tours/TourDaySchedule.tsx
import { Separator } from "@/components/ui/separator"
import { ReactNode } from "react"

interface ScheduleItemProps {
  time: string
  title: string
  description?: string | ReactNode
}

const ScheduleItem = ({ time, title, description }: ScheduleItemProps) => {
  return (
    <div className="flex">
      <div className="w-20 flex-shrink-0 text-sm text-muted-foreground">
        {time}
      </div>
      <div>
        <span className="font-medium">{title}</span>
        {description && typeof description === "string" ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : (
          description
        )}
      </div>
    </div>
  )
}

interface TourDayScheduleProps {
  day: number
  title: string
  items: ScheduleItemProps[]
  isLast?: boolean
}

export const TourDaySchedule = ({
  day,
  title,
  items,
  isLast = false,
}: TourDayScheduleProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">
        День {day}: {title}
      </h3>
      <div className="space-y-3 mt-3">
        {items.map((item, index) => (
          <ScheduleItem
            key={index}
            time={item.time}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      {!isLast && <Separator className="my-4" />}
    </div>
  )
}

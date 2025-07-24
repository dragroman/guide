import { EmptyState } from "@shared/ui/empty-state"
import { Typography } from "@shared/ui/typography"
import { Luggage, Plus } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DashboardTourPage",
  description: "",
}
export default async function DashboardTourPage() {
  return (
    <>
      <Typography title="Туры" />
      <EmptyState
        icon={Luggage}
        title="Туры пока не созданы"
        description="Создайте свой первый тур, чтобы начать планирование путешествий"
        actionLabel={
          <>
            <Plus className="h-4 w-4 mr-2" />
            Создать тур
          </>
        }
        actionHref="/dashboard/tours/create"
      />
    </>
  )
}

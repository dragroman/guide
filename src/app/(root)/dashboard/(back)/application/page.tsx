import { drupal } from "@shared/lib/drupal"
import { Button } from "@shared/ui/button"
import { EmptyState } from "@shared/ui/empty-state"
import { Typography } from "@shared/ui/typography"
import { DashboardList } from "@widgets/dashboard/list"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Edit, Plus } from "lucide-react"
import { Metadata } from "next"
import { DrupalNode } from "next-drupal"
import Link from "next/link"

export const metadata: Metadata = {
  title: "DashboardApplicationPage",
  description: "",
}

export default async function DashboardApplicationPage() {
  const applicationParams = new DrupalJsonApiParams()
  const applications = await drupal.getResourceCollection<DrupalNode[]>(
    "node--application",
    {
      params: applicationParams.getQueryObject(),
    }
  )
  return (
    <>
      <Typography level="h1" title="Анкеты" />
      {applications.length > 0 ? (
        <DashboardList nodes={applications} />
      ) : (
        <EmptyState
          icon={Edit}
          title="Анкеты пока созданы"
          description="Вы не заполнили ни одной анкеты"
          actionLabel={
            <>
              <Plus className="h-4 w-4 mr-2" />
              Создать анкету
            </>
          }
          actionHref="/application"
        />
      )}
    </>
  )
}

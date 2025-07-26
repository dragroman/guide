import { TApplicationTeaser } from "@entities/node/application"
import { drupal } from "@shared/lib/drupal"
import { EmptyState } from "@shared/ui/empty-state"
import { Skeleton } from "@shared/ui/skeleton"
import { Typography } from "@shared/ui/typography"
import { DashboardList } from "@widgets/dashboard/list"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Edit, Plus } from "lucide-react"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Мои анкеты",
  description: "",
}

export default function DashboardApplicationPage() {
  return (
    <>
      <Typography level="h1" title="Анкеты" />
      <Suspense fallback={<ApplicationsLoading />}>
        <ApplicationsList />
      </Suspense>
    </>
  )
}

async function ApplicationsList() {
  const applicationParams = new DrupalJsonApiParams()
    .addInclude(["field_cities"])
    .addFields("taxonomy_term--location", ["name"])
  const applications = await drupal.getResourceCollection<TApplicationTeaser[]>(
    "node--application",
    {
      params: applicationParams.getQueryObject(),
    }
  )
  return (
    <>
      {applications.length > 0 ? (
        <DashboardList nodes={applications} />
      ) : (
        <EmptyState
          icon={Edit}
          title="Анкеты пока не созданы"
          description="Без анкеты не обойтись — заполни первую, и начнём планировать поездку!"
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

async function ApplicationsLoading() {
  return <Skeleton className="h-[100px] rounded-xl w-full" />
}

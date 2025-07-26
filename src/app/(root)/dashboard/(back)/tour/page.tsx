import { TTourTeaser } from "@entities/node/tour"
import { authOptions } from "@features/auth/session"
import { nodeSchema } from "@features/spot/model/validation"
import { drupal } from "@shared/lib/drupal"
import { EmptyState } from "@shared/ui/empty-state"
import { Skeleton } from "@shared/ui/skeleton"
import { Typography } from "@shared/ui/typography"
import { ViewsTours } from "@widgets/views/tours"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Luggage, Plus } from "lucide-react"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Мои туры",
  description: "",
}
export default async function DashboardTourPage() {
  return (
    <>
      <Typography title="Туры" />
      <Suspense fallback={<Skeleton className="h-[100px] rounded-xl w-full" />}>
        <TourList />
      </Suspense>
    </>
  )
}

async function TourList() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return <div>Access Denied</div>
  }

  const applicationParams = new DrupalJsonApiParams()
    .addPageLimit(1)
    .addFields("node--application", ["drupal_internal__nid"])
  const applications = await drupal.getResourceCollection("node--application", {
    params: applicationParams.getQueryObject(),
    withAuth: `Bearer ${session.accessToken}`,
  })
  const hasApplications = Boolean(applications?.length)

  const tourParams = new DrupalJsonApiParams()
    .addInclude(["field_spots.field_images.field_media_image"])
    .addFields("media--image", ["field_media_image", "name"])
    .addFilter("field_application.id", "missing", "<>")

  const tours = await drupal.getResourceCollection<TTourTeaser[]>(
    "node--tour",
    {
      params: tourParams.getQueryObject(),
      withAuth: `Bearer ${session.accessToken}`,
    }
  )
  const hasTours = Boolean(tours?.length)

  if (hasTours) {
    return <ViewsTours nodes={tours} />
  }

  if (hasApplications) {
    return (
      <EmptyState
        icon={Luggage}
        title="Туры пока не созданы"
        description="Работаем над твоей анкетой. Немного терпения!"
      />
    )
  }

  return (
    <EmptyState
      icon={Luggage}
      title="Туры пока не созданы"
      description="Похоже, у тебя ещё нет анкет. Заполни одну — и можно будет собирать тур под тебя!"
      actionLabel={
        <>
          <Plus className="h-4 w-4 mr-2" />
          Заполнить анкету
        </>
      }
      actionHref="/application"
    />
  )
}

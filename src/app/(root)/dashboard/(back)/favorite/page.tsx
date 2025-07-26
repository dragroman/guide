import { TSpotDefaultTeaser } from "@entities/node/spot"
import { authOptions } from "@features/auth/session"
import { getUserFlags } from "@features/favorites"
import { drupal } from "@shared/lib/drupal"
import { EmptyState } from "@shared/ui/empty-state"
import { Skeleton } from "@shared/ui/skeleton"
import { Typography } from "@shared/ui/typography"
import { ViewsSpotDefault } from "@widgets/views/spots"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { ChevronRight, Edit } from "lucide-react"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

import { Suspense } from "react"
export const metadata: Metadata = {
  title: "DashboardFavoritePage",
  description: "",
}
export default async function DashboardFavoritePage() {
  return (
    <>
      <Typography title="Избранное" />
      <Suspense fallback={<Loading />}>
        <ItemList />
      </Suspense>
    </>
  )
}

async function ItemList() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return notFound()
  }

  const userFlags = await getUserFlags(session.user.id, session.accessToken)

  const favoritesParams = new DrupalJsonApiParams()
    .addInclude(["field_images.field_media_image"])
    .addInclude(["field_category"])
    .addFields("taxonomy_term--category", ["name"])

  const favorites = await drupal.getView<TSpotDefaultTeaser[]>(
    "favorites--user",
    {
      params: favoritesParams.getQueryObject(),
      withAuth: `Bearer ${session.accessToken}`,
    }
  )

  return (
    <>
      {favorites.meta.count > 0 ? (
        <ViewsSpotDefault nodes={favorites.results} userFlags={userFlags} />
      ) : (
        <EmptyState
          icon={Edit}
          title="Вы не добавили в избранное"
          description="Пусто! Добавь что-нибудь в избранное — так будет проще вернуться к понравившемуся."
          actionLabel={
            <>
              Перейти к поиску мест
              <ChevronRight className="h-4 w-4 mr-2" />
            </>
          }
          actionHref="/cities"
        />
      )}
    </>
  )
}

async function Loading() {
  return <Skeleton className="h-[100px] rounded-xl w-full" />
}

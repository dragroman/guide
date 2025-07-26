import { authOptions } from "@features/auth/session"
import { getUserFlags } from "@features/favorites"
import { EmptyState } from "@shared/ui/empty-state"
import { Skeleton } from "@shared/ui/skeleton"
import { Typography } from "@shared/ui/typography"
import { ViewsSpotDefault } from "@widgets/views/spots"
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/user-favorites`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json",
      },
    }
  )

  const favorites = await response.json()

  return (
    <>
      {favorites.data && favorites.data.length > 0 ? (
        <ViewsSpotDefault nodes={favorites.data} userFlags={userFlags} />
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

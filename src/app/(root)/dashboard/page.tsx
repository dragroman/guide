import { authOptions } from "@features/auth/session"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getServerSession, Session } from "next-auth"
import { SignOut } from "@features/auth/sign-out"
import { AddContent } from "@widgets/dashboard/add-content"
import { UserFull } from "@entities/user"
import { UserApplications } from "@widgets/user-applications"
import { drupal } from "@shared/lib/drupal"
import { TApplicationTeaser } from "@entities/node/application"
import { Typography } from "@shared/ui/typography"
import { Separator } from "@shared/ui/separator"
import { DrupalUser } from "next-drupal"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Личный кабинет",
  description: "Личный кабинет пользователя",
  robots: {
    follow: false,
    index: false,
  },
}

export default async function UserProfile() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return "У вас нет доступа"
  }

  const params = new DrupalJsonApiParams()
    .addSort("-created")
    .addFilter("uid.id", session.user.id)

  const currentUser = await drupal.getResource<DrupalUser>(
    "user--user",
    session.user.id,
    {
      withAuth: `Bearer ${session.accessToken}`,
      next: {
        revalidate: 3600,
        tags: [`user ${session.user.id}`, "applications"],
      },
    }
  )

  const applications = await drupal.getResourceCollection<TApplicationTeaser[]>(
    "node--application",
    {
      params: params.getQueryObject(),
      withAuth: `Bearer ${session.accessToken}`,
      next: {
        revalidate: 3600,
        tags: [`user-applications ${session.user.id}`, "applications"],
      },
    }
  )

  return (
    <div className="space-y-4">
      <Typography>Личный кабинет</Typography>
      <UserFull user={currentUser} />
      {/* TODO: Add actions for content editor */}
      {/* <AddContent /> */}
      {/* Section "Step 1" */}
      <Typography level="h2">Шаг 1. Заполнение анкеты</Typography>
      <UserApplications
        nodes={applications}
        accessToken={session.accessToken}
      />
      {/* Section Step 2 */}
      <Typography level="h2">Шаг 2. Составление тура</Typography>

      <Separator />
      <div className="text-center">
        <SignOut />
      </div>
    </div>
  )
}

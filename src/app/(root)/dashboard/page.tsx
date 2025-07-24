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
import { Alert } from "@shared/ui/alert"
import { Button } from "@shared/ui/button"
import Link from "next/link"
import { Edit2Icon } from "lucide-react"

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

  const isExpert = session.user.roles.includes("expert")
  const name = session.user.name || session.user.email || ""

  return (
    <div className="space-y-12">
      <Typography>Личный кабинет</Typography>

      {/* <UserFull user={currentUser} /> */}
      {isExpert && <AddContent name={name} />}
      {/* Section "Step 1" */}
      <div className="space-y-4">
        <Typography level="h2">Анкеты</Typography>
        <UserApplications nodes={applications} />
      </div>
      {/* Section Step 2 */}
      <div className="space-y-4">
        <Typography level="h2">Туры</Typography>
        <Alert className="flex min-h-20 items-center justify-center">
          Процесс создания тура будет доступен только после заполнения анкеты
        </Alert>
      </div>

      <Separator />
      <div className="text-center">
        <SignOut />
      </div>
    </div>
  )
}

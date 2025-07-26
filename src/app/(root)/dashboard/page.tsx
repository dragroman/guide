import { authOptions } from "@features/auth/session"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getServerSession } from "next-auth"
import { AddContent } from "@widgets/dashboard/add-content"
import { drupal } from "@shared/lib/drupal"
import { TApplicationTeaser } from "@entities/node/application"
import { Typography } from "@shared/ui/typography"
import { Separator } from "@shared/ui/separator"
import { DrupalUser } from "next-drupal"
import { Metadata } from "next"
import { DashboardMenu } from "@widgets/dashboard/menu"

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

  const isExpert = session.user.roles.includes("expert")
  const name = session.user.name || session.user.email || ""

  return (
    <div className="space-y-8">
      <Typography>Личный кабинет</Typography>
      <Typography level="h2">Привет, {name}!</Typography>
      {/* <UserFull user={currentUser} /> */}
      {isExpert && <AddContent name={name} />}
      {/* Section "Step 1" */}
      <DashboardMenu />
      <Separator />
    </div>
  )
}

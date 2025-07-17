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

export default async function UserProfile() {
  const session = await getServerSession(authOptions)
  const params = new DrupalJsonApiParams().addSort("-created")

  if (!session) {
    return "У вас нет доступа"
  }

  const nodes = await drupal.getResourceCollection<TApplicationTeaser[]>(
    "node--application",
    {
      params: params.getQueryObject(),
    }
  )

  console.log(session)

  // const currentUser = await drupal.getResource<DrupalUser>(
  //   "user--user",
  //   session.userId
  // )

  return (
    <div className="space-y-4">
      <Typography>Личный кабинет</Typography>
      <UserFull user={session?.user} />
      <AddContent />
      {session?.accessToken && (
        <UserApplications nodes={nodes} accessToken={session.accessToken} />
      )}
      <Separator />
      <div className="text-center">
        <SignOut />
      </div>
    </div>
  )
}

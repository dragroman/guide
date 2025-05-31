import { authOptions } from "@features/auth/session"
import { PageTitle } from "@shared/ui/page-title"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getServerSession, Session } from "next-auth"
import { SignOut } from "@features/auth/sign-out"
import { AddContent } from "@widgets/dashboard/add-content"
import { UserFull } from "@entities/user"

export default async function UserProfile() {
  const session = await getServerSession(authOptions)
  const api = new DrupalJsonApiParams()

  return (
    <>
      <PageTitle title="Логин" />
      <UserFull user={session?.user} />
      <SignOut />
      <AddContent />
    </>
  )
}

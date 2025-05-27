import { authOptions } from "@/features/auth/session"
import { PageTitle } from "@shared/ui/page-title"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getServerSession, Session } from "next-auth"
import { SignOut } from "@/features/auth/sign-out"

export default async function UserProfile() {
  const session = await getServerSession(authOptions)
  const api = new DrupalJsonApiParams()
  if (!session) {
    return null
  }
  console.log(session)
  return (
    <>
      <PageTitle title="Логин" />
      <SignOut />
    </>
  )
}

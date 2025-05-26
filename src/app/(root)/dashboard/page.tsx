import { authOptions } from "@features/auth"
import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getServerSession, Session } from "next-auth"
import { DrupalUser } from "next-drupal"

export default async function UserProfile() {
  const session = await getServerSession(authOptions)
  const api = new DrupalJsonApiParams()
  if (!session) {
    return null
  }
  const user = await drupal.getResource<DrupalUser>(
    "user--user",
    `${session.user.id}`
  )
  return (
    <>
      <PageTitle title="Логин" />
    </>
  )
}

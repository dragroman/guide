import { Session } from "next-auth"
import { User } from "../model/types"
import { DrupalUser } from "next-drupal"

export const UserFull = ({ user }: { user: DrupalUser }) => {
  return (
    <div>
      <div>{user.created}</div>
      <div>{user.name}</div>
    </div>
  )
}

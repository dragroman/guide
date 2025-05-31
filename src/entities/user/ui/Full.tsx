import { Session } from "next-auth"
import { User } from "../model/types"

export const UserFull = ({ user }: { user: any }) => {
  return (
    <div>
      <div>{user.id}</div>
      <div>{user.name}</div>
    </div>
  )
}

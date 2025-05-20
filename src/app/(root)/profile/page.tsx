import { UserProfile } from "@/entities/user"
import { drupal } from "@shared/lib/drupal"
import { AuthCheck } from "@features/login"
import { getServerSession } from "next-auth"

export default async function ProfilePage() {
  return (
    <AuthCheck>
      <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Ваш профиль</h1>
        <UserProfile />
      </div>
    </AuthCheck>
  )
}

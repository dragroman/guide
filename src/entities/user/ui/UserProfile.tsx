"use client"

import { drupal } from "@/shared/lib/drupal"
import { useSession, signOut } from "next-auth/react"

export function UserProfile() {
  const { data: session } = useSession()

  return (
    <div>
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-semibold">ID:</span> {session?.user?.id}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Имя пользователя:</span>{" "}
          {session?.user?.display_name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {session?.user?.email}
        </p>
        {/* Дополнительные поля из декодированного токена */}
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Выйти
      </button>
    </div>
  )
}

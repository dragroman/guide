// components/AuthStatus.tsx
"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function AuthStatus() {
  const { data: session, status } = useSession()

  return (
    <div className="flex items-center">
      {status === "authenticated" ? (
        <div className="flex items-center gap-4">
          <span className="text-sm">Вы вошли как User</span>
          <Link href="/profile" className="text-blue-600 hover:text-blue-800">
            Профиль
          </Link>
        </div>
      ) : (
        <Link href="/signin" className="text-blue-600 hover:text-blue-800">
          Войти
        </Link>
      )}
    </div>
  )
}

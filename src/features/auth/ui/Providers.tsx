"use client"

import { SessionProvider, signOut, useSession } from "next-auth/react"
import { ReactNode, useEffect } from "react"

// Компонент для мониторинга ошибок сессии
function SessionMonitor({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    if (
      session?.error === "RefreshTokenError" ||
      session?.error === "SessionExpired"
    ) {
      // Выход при ошибке обновления токена
      signOut({ callbackUrl: "/login" })
    }
  }, [session])

  return <>{children}</>
}

// Провайдер для всего приложения
export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionMonitor>{children}</SessionMonitor>
    </SessionProvider>
  )
}

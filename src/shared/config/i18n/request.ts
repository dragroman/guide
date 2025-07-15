import { getRequestConfig } from "next-intl/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@features/auth/session"

export default getRequestConfig(async () => {
  // const session = await getServerSession(authOptions)
  // const locale = session?.user?.preferred_langcode || "ru"
  const locale = "ru"

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const authRoutes = ["/signin", "/register"]
const protectedRoutes = ["/dashboard", "/profile"]
const protectedPatterns = ["/add/"] // Паттерны для защищенных маршрутов

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = req.nextUrl

  // Проверяем, является ли маршрут авторизационным
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Проверяем защищенные маршруты по точному совпадению
  const isExactProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Проверяем защищенные маршруты по паттернам
  const isPatternProtectedRoute = protectedPatterns.some((pattern) =>
    pathname.includes(pattern)
  )

  const isProtectedRoute = isExactProtectedRoute || isPatternProtectedRoute

  // Если пользователь авторизован
  if (token) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    return NextResponse.next()
  }

  // Если пользователь НЕ авторизован
  if (!token) {
    if (isProtectedRoute) {
      const loginUrl = new URL("/signin", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

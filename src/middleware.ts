import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const authRoutes = ["/signin", "/register"]
const protectedRoutes = ["/dashboard", "/profile", "/settings"]

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = req.nextUrl

  // Проверяем, является ли маршрут авторизационным (login, register)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Проверяем, является ли маршрут защищенным
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Если пользователь авторизован
  if (token) {
    // И пытается зайти на страницы авторизации
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Разрешаем доступ к защищенным и публичным страницам
    return NextResponse.next()
  }

  // Если пользователь НЕ авторизован
  if (!token) {
    // И пытается зайти на защищенную страницу
    if (isProtectedRoute) {
      // Сохраняем URL для редиректа после авторизации
      const loginUrl = new URL("/signin", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Разрешаем доступ к публичным и авторизационным страницам
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

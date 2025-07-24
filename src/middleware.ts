import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const authRoutes = ["/signin", "/signup"]
const protectedRoutes = ["/dashboard/*"]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Обработка API роутов в первую очередь
  if (pathname.startsWith("/api/")) {
    return handleApiRoute(req)
  }

  // Обработка авторизации только для страниц
  return handleAuthRoute(req)
}

async function handleApiRoute(req: NextRequest) {
  const clientIp = extractClientIp(req)
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-real-client-ip", clientIp)

  // Логирование только в development
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Middleware] API route: ${req.nextUrl.pathname}, Client IP: ${clientIp}`
    )
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

async function handleAuthRoute(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Оптимизация: проверяем нужность токена
  const needsAuthCheck =
    authRoutes.some((route) => pathname.startsWith(route)) ||
    protectedRoutes.some((route) => pathname.startsWith(route))

  if (!needsAuthCheck) {
    return NextResponse.next()
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Авторизованный пользователь
  if (token) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    return NextResponse.next()
  }

  // Неавторизованный пользователь
  if (isProtectedRoute) {
    const loginUrl = new URL("/signin", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

function extractClientIp(request: NextRequest): string {
  const ipHeaders = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "cf-connecting-ip",
    "true-client-ip",
  ]

  for (const header of ipHeaders) {
    const ip = request.headers.get(header)
    if (ip) {
      const firstIp = ip.split(",")[0].trim()
      if (isValidIp(firstIp)) {
        return firstIp
      }
    }
  }

  return "127.0.0.1"
}

function isValidIp(ip: string): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/

  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

// Обновленная конфигурация
export const config = {
  matcher: [
    // Включаем API роуты для обработки IP
    "/api/(.*)",
    // Включаем все страницы кроме статики
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

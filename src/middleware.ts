export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/application(.*)", "/profile(.*)", "/hotel/add"],
}

import { NextDrupal } from "next-drupal"

const baseUrl =
  process.env.NEXT_PUBLIC_BUILD_DRUPAL_BASE_URL ||
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ||
  "http://drupal"
const clientId = process.env.DRUPAL_CLIENT_ID || "dummy_id"
const clientSecret = process.env.DRUPAL_CLIENT_SECRET || "dummy_secret"

export const drupal = new NextDrupal(baseUrl, {
  // Enable to use authentication
  // auth: {
  //   clientId,
  //   clientSecret,
  // },
  // withAuth: true,
  // debug: true,
})

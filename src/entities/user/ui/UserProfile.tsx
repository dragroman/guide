"use client"

import { drupal } from "@/shared/lib/drupal"
import { useSession, signOut } from "next-auth/react"

export function UserProfile() {
  const { data: session } = useSession()

  return <></>
}

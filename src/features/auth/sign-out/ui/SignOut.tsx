"use client"
import { Button } from "@shared/ui/button"
import { signOut } from "next-auth/react"

export const SignOut = () => {
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      Выход
    </Button>
  )
}

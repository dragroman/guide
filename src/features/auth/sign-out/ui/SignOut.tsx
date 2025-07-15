"use client"
import { Button } from "@shared/ui/button"
import { signOut } from "next-auth/react"
import { useTranslations } from "next-intl"

export const SignOut = () => {
  const t = useTranslations("signout")
  return (
    <Button
      className="cursor-pointer"
      variant="destructive"
      onClick={() => signOut()}
    >
      {t("exit")}
    </Button>
  )
}

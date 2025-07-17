"use client"
import { Button } from "@shared/ui/button"
import { signOut } from "next-auth/react"
import { useTranslations } from "next-intl"

export const SignOut = () => {
  const t = useTranslations("signOut")
  return (
    <Button
      className="cursor-pointer"
      variant="outline"
      onClick={() => signOut()}
    >
      {t("exit")}
    </Button>
  )
}

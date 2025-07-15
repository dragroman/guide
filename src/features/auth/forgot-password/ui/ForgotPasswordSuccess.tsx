"use client"

import { useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@shared/ui/card"
import { Button } from "@shared/ui/button"
import { CheckCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function ForgotPasswordSuccess() {
  const router = useRouter()
  const t = useTranslations("dashboard.forgotPassword")

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signin")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{t("passwordChanged")}</h2>
          <p className="text-muted-foreground">
            {t("passwordChangedDescription")}
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => router.push("/signin")} className="w-full">
            {t("goToLogin")}
          </Button>
          <p className="text-xs text-muted-foreground">
            {t("automaticRedirect")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

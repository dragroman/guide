"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@shared/ui/card"
import { Button } from "@shared/ui/button"
import { CheckCircle } from "lucide-react"

interface SuccessScreenProps {
  email: string
}

export function SuccessScreen({ email }: SuccessScreenProps) {
  const router = useRouter()

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
          <h2 className="text-2xl font-bold">Регистрация завершена!</h2>
          <p className="text-muted-foreground">
            Ваш аккаунт {email} успешно создан
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => router.push("/signin")} className="w-full">
            Перейти к входу
          </Button>
          <p className="text-xs text-muted-foreground">
            Автоматический переход через 5 секунд...
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

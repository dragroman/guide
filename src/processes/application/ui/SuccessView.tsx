"use client"

import React, { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@shared/ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { SOCIAL } from "@shared/lib/constants"
import { Typography } from "@shared/ui/typography"

interface SuccessViewProps {
  onReset: () => void
}

const t = SOCIAL

export function SuccessView({ onReset }: SuccessViewProps) {
  const searchParams = useSearchParams()
  const [expertEmail, setExpertEmail] = useState<string>("")

  useEffect(() => {
    // Получаем email из URL-параметров
    const emailFromUrl = searchParams.get("email")
    if (emailFromUrl && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFromUrl)) {
      setExpertEmail(emailFromUrl)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 text-center">
        <div className="mb-4">
          <Typography level="h1">Заявка успешно отправлена!</Typography>
        </div>
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="mt-4 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-bounce">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <p className="text-center text-muted-foreground">
            Отлично! Наш координатор совсем скоро свяжется с вами, чтобы вместе
            спланировать ваше увлекательное путешествие! Примерное время
            ожидания ~2 недели.
          </p>
          {expertEmail && (
            <div className="mt-2 w-full p-3 bg-blue-50 rounded-md border border-blue-100 text-sm">
              <p className="text-blue-800">
                Результаты формы отправлены на адрес:{" "}
                <strong>{expertEmail}</strong>
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col text-center space-y-4">
          <p className="">
            А пока можете подписаться наши социальные сети, чтобы бы быть в
            курсе
          </p>
          <div className="space-x-4">
            <a target="_blank" href={t.instagram.link}>
              <Button>
                <t.instagram.icon /> {t.instagram.label}
              </Button>
            </a>
            <a target="_blank" href={t.telegram.link}>
              <Button>
                <t.telegram.icon /> {t.telegram.label}
              </Button>
            </a>
          </div>
          <Link href="/" className="mb-2">
            <Button variant="outline">Вернуться на сайт</Button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-sm mx-auto text-center mb-4">
        <div className="text-muted-foreground text-sm">
          Написать разработчику формы
        </div>
        <div>
          <Button variant={"link"}>
            <Link target="_blank" href="https://t.me/dragroman">
              Telegram
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"link"}>WeChat</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Мой id: romal003</DialogTitle>
              <Image src="/wechat.jpg" width={400} height={400} alt="" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

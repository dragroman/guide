import React, { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

interface SuccessViewProps {
  onReset: () => void
}

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
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            Заявка успешно отправлена!
          </CardTitle>
          <CardDescription className="text-center">
            Мы свяжемся с вами в ближайшее время
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <p className="text-center text-muted-foreground">
            Спасибо за вашу заявку. Наш менеджер свяжется с вами в ближайшее
            время для уточнения деталей.
          </p>
          {expertEmail && (
            <div className="mt-2 w-full p-3 bg-blue-50 rounded-md border border-blue-100 text-sm">
              <p className="text-blue-800">
                Результаты формы отправлены на адрес:{" "}
                <strong>{expertEmail}</strong>
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onReset}>Отправить еще одну заявку</Button>
        </CardFooter>
      </Card>
      <div className="w-full max-w-sm mx-auto text-center mt-4">
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
    </>
  )
}

import React from "react"
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

interface SuccessViewProps {
  onReset: () => void
}

export function SuccessView({ onReset }: SuccessViewProps) {
  return (
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
          Спасибо за вашу заявку. Наш менеджер свяжется с вами в ближайшее время
          для уточнения деталей.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onReset}>Отправить еще одну заявку</Button>
      </CardFooter>
    </Card>
  )
}

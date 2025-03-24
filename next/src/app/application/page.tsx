// src/app/application/page.tsx
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/navigation/Header"
import { Footer } from "@/components/navigation/Footer"
import {
  Clock,
  Calendar,
  MessagesSquare,
  Heart,
  CheckCircle2,
  Medal,
  ArrowRight,
} from "lucide-react"

export const metadata = {
  title: "Персональный подбор тура",
  description: "Создайте идеальное путешествие по Китаю",
}

export default function ApplicationPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative h-[100vh] sm:h-[50vh] overflow-hidden">
          {/* Оптимизированное изображение с next/image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/greatwall.jpg"
              alt="Панорама Харбина"
              fill
              priority
              quality={85}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                opacity: 1,
              }}
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          {/* Контент */}
          <div className="container relative h-full flex flex-col justify-center items-start max-w-5xl mx-auto px-4 z-10">
            <Badge className="mb-4">Индивидуальный подход</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Персональный подбор тура
              <span className="text-primary">.</span>
            </h1>
            <p className="text-xl text-white max-w-2xl mb-8">
              Давайте вместе создадим идеальное путешествие по Китаю, которое
              подойдёт именно вам. Ответьте на несколько вопросов — это займёт
              не больше 5 минут, а результат вас приятно удивит!
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/application/start">
                <Button size="lg" className="px-8 py-6 text-lg font-medium">
                  Начать подбор
                </Button>
              </Link>
              <p className="text-center text-sm text-white">
                Бесплатно и без обязательств
              </p>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-card">
                  <CardHeader className="pb-3">
                    <div className="p-3 rounded-full bg-primary/10 w-fit">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-2">Быстро</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Всего 5 минут на заполнение анкеты и до 24 часов на
                      подготовку персонального маршрута
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader className="pb-3">
                    <div className="p-3 rounded-full bg-primary/10 w-fit">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-2">
                      Индивидуально
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Учитываем все ваши пожелания и предпочтения для создания
                      уникального маршрута
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-card">
                  <CardHeader className="pb-3">
                    <div className="p-3 rounded-full bg-primary/10 w-fit">
                      <Medal className="h-6 w-6 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-2">Эффективно</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Оптимальные маршруты, проверенные места и реальные инсайты
                      от местного жителя
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

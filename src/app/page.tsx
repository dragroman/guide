import type { Metadata } from "next"
import { Button } from "@shared/ui/button"
import { Badge } from "@shared/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { SOCIAL } from "@shared/lib/constants"
import { Clock } from "lucide-react"
import { Header } from "@widgets/header"

export const metadata: Metadata = {
  title: "Путеводитель по Китаю",
  description: "Лучший путеводитель по Китаю от местного жителя",
}

const t = SOCIAL

export default async function Home() {
  return (
    <>
      <Header />
      {/* Hero секция */}
      <section className="relative h-[100vh] overflow-hidden">
        {/* Контент */}
        <div className="container relative h-full flex flex-col justify-between items-start mx-auto px-4 py-4 z-10 text-center">
          <div></div>
          <div>
            <div className="w-full">
              <Badge className="mb-4" variant="outline">
                Местный эксперт в Китае
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight w-full">
              Путешествия, созданные лично для вас
              <br />
              <span className="text-primary">местными экспертами</span>
            </h1>
            <p className="text-md md:text-xl w-xl mb-8 text-center md:w-full">
              Откройте Китай по-настоящему. Забудьте про шаблонные туры —
              отправьтесь в уникальное путешествие, которое создаст для вас
              человек, живущий в этом месте.
            </p>
            <p className="text-xl w-xl mb-8 text-center md:w-full">
              Начните планировать с местным экспертом — бесплатно.
            </p>
          </div>
          <div className="flex flex-col sm:flex-col gap-4 w-full justify-between">
            <div className="text-sm  flex items-center justify-center">
              <Clock className="w-6 h-6 mr-2" />
              Примерное время заполнения 3-4 минуты
            </div>
            <Link href="/application">
              <Button size="lg" className="w-full">
                Начать планирование
              </Button>
            </Link>
            <Link href="/more">
              <Button size="lg" variant="link" className="">
                Подробнее
              </Button>
            </Link>

            {/* <Link href="/blog">
              <Button size="lg" variant="outline" className="px-8">
                Читать блог
              </Button>
            </Link> */}
          </div>
        </div>
      </section>
    </>
  )
}

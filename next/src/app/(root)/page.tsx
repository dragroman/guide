import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Путеводитель по Китаю",
  description: "Лучший путеводитель по Китаю от местного жителя",
}

export default async function Home() {
  return (
    <>
      {/* Hero секция */}
      <section className="relative h-[100vh]  overflow-hidden">
        {/* Оптимизированное изображение с next/image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
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
        <div className="container relative h-full flex flex-col justify-center items-start max-w-5xl mx-auto px-4 z-10 text-center">
          <div className="w-full">
            <Badge className="mb-4 text-white" variant="outline">
              Местный эксперт в Китае
            </Badge>
          </div>
          <h1 className="text-3xl md:text-7xl font-bold mb-6 tracking-tight text-white w-full">
            Путешествия, созданные лично для вас
            <br />
            <span className="text-primary">местными экспертами</span>
          </h1>
          <p className="text-md md:text-xl text-white w-xl mb-8 text-center md:w-full">
            Откройте Китай по-настоящему. Забудьте про шаблонные туры —
            отправьтесь в уникальное путешествие, которое создаст для вас
            человек, живущий в этом месте.
          </p>
          <p className="text-xl text-white w-xl mb-8 text-center md:w-full">
            Начните планировать с местным экспертом — бесплатно.
          </p>
          <div className="flex flex-col sm:flex-col gap-4 w-full justify-center">
            <Link href="/application">
              <Button size="lg" className="px-8">
                Начать планирование
              </Button>
            </Link>
            <Link href="/more">
              <Button size="lg" variant="link" className="text-white">
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

import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Ghost, MapPin, Clock, Coffee } from "lucide-react"
import ArticleTeaserList from "@/components/drupal/ArticleTeaserList"

export const metadata: Metadata = {
  title: "Путеводитель по Китаю",
  description: "Лучший путеводитель по Харбину от местного жителя",
}

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero секция */}
      <div className="relative h-[85vh] bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/harbin-bg.jpg')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Китай<span className="text-pink-400">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Уникальный взгляд на город, где Восток встречается с Западом. Мой
            второй дом последние 10 лет.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/application">
              <Button className="min-w-[180px] border-none font-bold py-6">
                Подобрать тур
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* О проекте */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-pink-600 font-semibold mb-2">
            О путеводителе
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Привет<span className="text-pink-600">!</span>
          </h2>
          {/*
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed text-gray-700">
              Меня зовут Ирина, и последние 10 лет я провела в Харбине —
              удивительном городе на северо-востоке Китая, где причудливо
              переплелись китайская культура и русское наследие.
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              На страницах этого гида я поделюсь с вами своими любимыми местами
              и проверенными рекомендациями, которые сделают ваше путешествие
              по-настоящему особенным. От секретных кофеен, спрятанных в
              переулках, до лучших точек для фотографий — здесь собрано всё, что
              поможет увидеть Харбин глазами местного жителя.
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              Независимо от того, приезжаете ли вы на знаменитый Фестиваль
              ледяных скульптур или хотите просто погрузиться в уникальную
              атмосферу города вне туристического сезона — этот гид станет вашим
              верным компаньоном.
            </p>
          </div> */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full">
                <div className="text-4xl font-bold text-pink-600 mb-4">01</div>
                <h3 className="text-xl font-bold mb-3">Локации</h3>
                <p className="text-gray-600 flex-grow">
                  Секретные места, о которых не пишут в путеводителях и не знают
                  обычные туристы
                </p>
              </div>
            </div>
            <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full">
                <div className="text-4xl font-bold text-pink-600 mb-4">02</div>
                <h3 className="text-xl font-bold mb-3">Еда</h3>
                <p className="text-gray-600 flex-grow">
                  Проверенные рестораны, уличная еда и самые интересные
                  кулинарные эксперименты
                </p>
              </div>
            </div>
            <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col h-full">
                <div className="text-4xl font-bold text-pink-600 mb-4">03</div>
                <h3 className="text-xl font-bold mb-3">Маршруты</h3>
                <p className="text-gray-600 flex-grow">
                  Готовые дневные маршруты для разных сезонов, интересов и
                  длительности пребывания
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Блог */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-pink-600 font-semibold mb-2">
                Блог
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Последние записи<span className="text-pink-600">.</span>
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Истории, советы и наблюдения из жизни в Китае
              </p>
            </div>
            <div className="space-y-16">{/* <ArticleTeaserList /> */}</div>
            <div className="mt-12 text-center">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Смотреть все записи
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Готовы открыть для себя Харбин?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Заполните анкету, и я подберу для вас идеальный маршрут с учетом
              ваших интересов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/application">
                <Button className="min-w-[200px] bg-pink-600 hover:bg-pink-700 border-none text-white py-6">
                  Подобрать тур
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

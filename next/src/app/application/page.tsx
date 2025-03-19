// src/app/application/page.tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/navigation/Header"
import { Footer } from "@/components/navigation/Footer"

export const metadata = {
  title: "Персональный подбор тура",
  description: "Создайте идеальное путешествие по Китаю",
}

export default function ApplicationPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto">
            {/* Заголовок */}
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-widest text-pink-600 font-semibold mb-2 ">
                Индивидуальный подход
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 ">
                Персональный подбор тура<span className="text-pink-600">.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Давайте вместе создадим идеальное путешествие по Китаю, которое
                подойдёт именно вам. Ответьте на несколько вопросов — это займёт
                не больше 5 минут, а результат вас приятно удивит!
              </p>
              <div className="pt-6 mt-6 border-t border-gray-100">
                <Link href="/application/start">
                  <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-6 text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Начать подбор
                  </Button>
                </Link>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Бесплатно и без обязательств
                </p>
              </div>
            </div>

            {/* Основной блок */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Левая колонка с изображением */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                {/* <div className="aspect-[4/5] relative">
                  <Image
                    src="/harbin-tour.jpg"
                    alt="Туристы в Харбине"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium mb-2 text-pink-300">
                      Харбинский фестиваль льда и снега
                    </p>
                    <p className="text-lg font-bold ">
                      Насладитесь уникальными впечатлениями
                    </p>
                  </div>
                </div>
              </div>

              {/* Правая колонка с информацией и кнопкой */}
              <div className="bg-white p-8 rounded-xl shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-pink-100 p-3 rounded-full text-pink-600 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 ">Быстро</h3>
                      <p className="text-gray-600">
                        Всего 5 минут на заполнение анкеты
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 ">
                        Индивидуально
                      </h3>
                      <p className="text-gray-600">
                        Учитываем все ваши пожелания и предпочтения
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full text-green-600 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 ">
                        Эффективно
                      </h3>
                      <p className="text-gray-600">
                        Получите готовый маршрут в течение 24 часов
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-white shadow-md">
                <div className=" text-lg font-bold mb-3">
                  01. Заполните анкету
                </div>
                <p className="text-gray-600">
                  Расскажите о своих предпочтениях, интересах и ожиданиях от
                  поездки
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white shadow-md">
                <div className=" text-lg font-bold mb-3">
                  02. Получите предложение
                </div>
                <p className="text-gray-600">
                  Мы свяжемся с вами и предложим персональный маршрут
                </p>
              </div>
              <div className="p-6 rounded-lg bg-white shadow-md">
                <div className=" text-lg font-bold mb-3">
                  03. Наслаждайтесь поездкой
                </div>
                <p className="text-gray-600">
                  Погрузитесь в уникальную атмосферу Харбина с личным гидом
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

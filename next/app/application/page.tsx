import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Персональный подбор тура",
  description: "Свяжитесь с нами через нашу контактную форму",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Персональный подбор тура
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Привет! Давайте вместе создадим идеальное путешествие по Китаю, которое
        подойдёт именно вам. Ответьте на несколько вопросов — это займёт не
        больше 5 минут, а результат вас приятно удивит!
      </p>
      <div className="text-center mt-20">
        <Link href="/application/start">
          <Button className="bg-lime-600 hover:bg-lime-700 py-10 px-20 text-3xl font-bold">
            Старт
          </Button>
        </Link>
      </div>
    </div>
  )
}

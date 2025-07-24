import { Button } from "@shared/ui/button"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Не найдено",
}
export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      {/* Component */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="rounded-full overflow-hidden mb-10">
          <Image alt="Логотип" src="/logo.svg" width={200} height={200} />
        </div>
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Ошибочка 404</h1>
        <p className="mx-auto mb-5 max-w-lg text-sm text-gray-500 sm:text-base md:mb-6 lg:mb-8">
          К сожалению, запрашиваемая страница не найдена. Возможно, она была
          удалена или перемещена на другой адрес.
        </p>
        <Button asChild size="lg">
          <Link href="/">Вернуться на главную</Link>
        </Button>
      </div>
    </section>
  )
}

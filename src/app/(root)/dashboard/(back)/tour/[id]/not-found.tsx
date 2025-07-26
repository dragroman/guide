import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Не найдено",
}
export default function NotFoundPage() {
  return (
    <section className="flex items-center justify-center">
      {/* Component */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="rounded-full overflow-hidden mb-10">
          <Image alt="Логотип" src="/logo.svg" width={100} height={100} />
        </div>
        <h1 className="mb-4 text-xl font-bold md:text-2xl">Что-то случилось</h1>
        <p className="mx-auto mb-5 max-w-lg text-sm text-gray-500 sm:text-base md:mb-6 lg:mb-8">
          Что-то случилось, если это ошибка, обратитесь в нашу поддержку
        </p>
      </div>
    </section>
  )
}

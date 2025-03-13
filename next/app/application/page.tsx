import Application from "@/components/application"

export const metadata = {
  title: "Контакты | Next.js для Drupal",
  description: "Свяжитесь с нами через нашу контактную форму",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Анкета на тур</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Заполните анкету ниже и мы подготовим тур по вашим запросам время.
      </p>

      <Application />
    </div>
  )
}

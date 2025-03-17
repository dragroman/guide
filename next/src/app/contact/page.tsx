import ContactForm from "@/components/ContactForm"

export const metadata = {
  title: "Контакты | Next.js для Drupal",
  description: "Свяжитесь с нами через нашу контактную форму",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Контактная форма</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Есть вопросы? Заполните форму ниже, и мы свяжемся с вами в ближайшее
        время.
      </p>

      <ContactForm />

      <div className="mt-12 max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Другие способы связи</h2>
        <div className="flex flex-col md:flex-row justify-around items-center gap-4">
          <div>
            <p className="font-medium">Email:</p>
            <a
              href="mailto:info@example.com"
              className="text-blue-600 hover:underline"
            >
              info@example.com
            </a>
          </div>
          <div>
            <p className="font-medium">Телефон:</p>
            <a
              href="tel:+71234567890"
              className="text-blue-600 hover:underline"
            >
              +7 (123) 456-78-90
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

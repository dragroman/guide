import ContactForm from "@/features/contact/ContactForm"

export const metadata = {
  title: "Контакты | Next.js для Drupal",
  description: "Свяжитесь с нами через нашу контактную форму",
}

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Контактная форма</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Есть вопросы? Заполните форму ниже, и мы свяжемся с вами в ближайшее
        время.
      </p>

      <ContactForm />
    </div>
  )
}

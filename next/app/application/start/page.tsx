import Application from "@/components/application"

export const metadata = {
  title: "Контакты | Next.js для Drupal",
  description: "Свяжитесь с нами через нашу контактную форму",
}

export default function ContactPage() {
  return (
    <div className="container w-[400px] mx-auto px-4 py-8">
      <Application />
    </div>
  )
}

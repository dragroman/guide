"use client"

import { useState } from "react"
import { Button } from "./ui/button"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setFormState({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    })

    try {
      // Используем наш API-маршрут Next.js для обращения к Drupal
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || "Произошла ошибка при отправке формы"
        )
      }

      // Очищаем форму после успешной отправки
      setFormData({
        name: "",
        email: "",
        message: "",
      })

      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: "",
      })
    } catch (error) {
      console.error("Ошибка отправки формы:", error)
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage:
          error instanceof Error
            ? error.message
            : "Произошла ошибка при отправке формы",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Свяжитесь с нами</h2>

      {formState.isSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Спасибо! Ваше сообщение успешно отправлено.
        </div>
      )}

      {formState.isError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {formState.errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Имя *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 font-medium mb-2"
          >
            Сообщение *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Отправка..." : "Отправить"}
        </Button>
      </form>
    </div>
  )
}

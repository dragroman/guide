// src/components/application/components/DownloadPdfButton.tsx
import React, { useState } from "react"
import { Button } from "@shared/ui/button"
import { FileDown, Loader2, CheckCircle2 } from "lucide-react"
import { useLocationData } from "../hooks/useLocationData"
import { ApplicationSchemaType } from "../config/schemas/applicationSchema"

interface DownloadPdfButtonProps {
  formData: ApplicationSchemaType
  className?: string
}

export const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({
  formData,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { locationData } = useLocationData(formData.city)

  const handleDownload = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)

      // Динамический импорт генератора PDF
      const { default: generatePdf } = await import("../utils/pdfGenerator")

      // Генерируем PDF
      await generatePdf(formData, locationData?.name)

      // Устанавливаем состояние успешной загрузки
      setIsSuccess(true)

      // Сбрасываем состояние через 3 секунды
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)

      // Отправляем событие аналитики
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "pdf_downloaded",
          formName: "application_form",
        })
      }
    } catch (error) {
      console.error("Ошибка при создании PDF:", error)
      alert(
        "Произошла ошибка при создании PDF. Пожалуйста, попробуйте еще раз."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={isSuccess ? "default" : "outline"}
      size="sm"
      className={className}
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Создание PDF...
        </>
      ) : isSuccess ? (
        <>
          <CheckCircle2 className="h-4 w-4 mr-2" />
          PDF создан
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4 mr-2" />
          Скачать как PDF
        </>
      )}
    </Button>
  )
}

export default DownloadPdfButton

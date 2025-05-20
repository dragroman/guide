"use client"
import { useState, useCallback } from "react"
import { FileUpload } from "@features/file-upload"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { Label } from "@shared/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@shared/ui/alert"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import { Progress } from "@shared/ui/progress"

export function HotelAdd() {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")
    setError("")
    setUploadProgress(0)

    try {
      // Создаем FormData для отправки файла
      const formData = new FormData()
      formData.append("title", title)

      if (image) {
        formData.append("image", image)
      }

      // Создаем XMLHttpRequest для отслеживания прогресса загрузки
      const xhr = new XMLHttpRequest()

      // Настраиваем обработчик прогресса
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(progress)
        }
      })

      // Создаем Promise для работы с XMLHttpRequest
      const response = await new Promise((resolve, reject) => {
        xhr.open("POST", "/api/hotel/add")

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText))
            } catch (error) {
              reject(new Error("Некорректный ответ от сервера"))
            }
          } else {
            try {
              const errorData = JSON.parse(xhr.responseText)
              reject(
                new Error(errorData.message || "Ошибка при создании отеля")
              )
            } catch (e) {
              reject(new Error("Ошибка при создании отеля"))
            }
          }
        }

        xhr.onerror = () => {
          reject(new Error("Ошибка сети при отправке запроса"))
        }

        xhr.send(formData)
      })

      setMessage("Отель успешно создан")
      setTitle("")
      setImage(null)
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Произошла ошибка при создании отеля"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Добавить новый отель</CardTitle>
        <CardDescription>
          Заполните форму для добавления нового отеля
        </CardDescription>
      </CardHeader>

      <CardContent>
        {message && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircleIcon className="h-4 w-4" />
            <AlertTitle>Успешно</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
            <XCircleIcon className="h-4 w-4" />
            <AlertTitle>Ошибка</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Название отеля</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <FileUpload onChange={setImage} label="Загрузить фотографию отеля" />

          {isSubmitting && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Загрузка</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploadProgress > 0
                  ? `Загрузка (${uploadProgress}%)`
                  : "Создание..."}
              </>
            ) : (
              "Создать отель"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

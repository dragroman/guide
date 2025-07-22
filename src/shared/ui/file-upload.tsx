import { useState, useRef, ChangeEvent } from "react"
import Image from "next/image"
import { Trash2, Upload } from "lucide-react"

interface FileUploadProps {
  url?: string
  acceptedFiles?: string
  maxSize?: number
  onUpload?: (file: File) => void
  onFilesChange: (files: File[]) => void
  maxFiles?: number
}

export function FileUpload({
  onFilesChange,
  url = "/upload",
  acceptedFiles = "image/*",
  maxFiles = 5,
  maxSize = 2,
  onUpload,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [progress, setProgress] = useState<number[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length === 0) return

    // Проверяем размер файла
    const validFiles = selectedFiles.filter(
      (file) => file.size <= maxSize * 1024 * 1024
    )

    if (validFiles.length !== selectedFiles.length) {
      alert(`Файл должен быть не более ${maxSize}МБ.`)
    }

    setFiles((prev) => [...prev, ...validFiles])
    setProgress((prev) => [...prev, ...validFiles.map(() => 0)])

    // Создаем превью для файлов
    validFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviews((prev) => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      }
    })

    // Имитация загрузки для демонстрации
    validFiles.forEach((file, index) => {
      simulateUpload(files.length + index, file)
    })

    const newFiles = [...files, ...validFiles].slice(0, maxFiles)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const simulateUpload = (index: number, file: File) => {
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      if (currentProgress > 100) {
        clearInterval(interval)
        if (onUpload) onUpload(file)
        return
      }

      setProgress((prev) => {
        const newProgress = [...prev]
        newProgress[index] = currentProgress
        return newProgress
      })
    }, 200)
  }

  const resetFiles = () => {
    setFiles([])
    setPreviews([])
    setProgress([])
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    const newProgress = progress.filter((_, i) => i !== index)

    setFiles(newFiles)
    setPreviews(newPreviews)
    setProgress(newProgress)
    onFilesChange(newFiles)
  }
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)

      const validFiles = droppedFiles.filter(
        (file) => file.size <= maxSize * 1024 * 1024
      )

      if (validFiles.length !== droppedFiles.length) {
        alert(`Файл должен быть не более ${maxSize}МБ.`)
      }

      const newFiles = [...files, ...validFiles].slice(0, maxFiles)
      setFiles(newFiles)
      onFilesChange(newFiles)
      setProgress((prev) => [...prev, ...validFiles.map(() => 0)])

      validFiles.forEach((file, index) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            setPreviews((prev) => [...prev, e.target?.result as string])
          }
          reader.readAsDataURL(file)
        }

        simulateUpload(files.length + index, file)
      })
    }
  }

  return (
    <>
      <div className="file-upload-container grid grid-cols-4 gap-2">
        {/* Превью загруженных файлов */}
        {previews.map((preview, index) => (
          <div key={index} className="relative rounded-xl">
            <Image
              className="mb-2 w-full object-cover rounded-lg aspect-square"
              src={preview}
              alt="Превью"
              width={200}
              height={200}
            />

            <div className="mb-1 flex justify-between items-center gap-x-3 whitespace-nowrap">
              <div className="w-10">
                <span className="text-sm text-gray-800 dark:text-white">
                  {progress[index]}%
                </span>
              </div>

              <div className="flex items-center gap-x-2">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  onClick={() => removeFile(index)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>

            <div
              className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
              role="progressbar"
              aria-valuenow={progress[index]}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`flex flex-col justify-center rounded-full overflow-hidden ${progress[index] === 100 ? "bg-green-500" : "bg-blue-600"} text-xs text-white text-center whitespace-nowrap transition-all duration-500`}
                style={{ width: `${progress[index]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      {/* Область загрузки файла */}
      <div
        className="cursor-pointer p-12 flex justify-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-center">
          <span className="inline-flex justify-center items-center size-16 bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-700 dark:text-neutral-200">
            <Upload />
          </span>

          <div className="mt-4 flex flex-wrap justify-center text-sm/6 text-gray-600">
            <span className="pe-1 font-medium text-gray-800 dark:text-neutral-200">
              Перетащите файл сюда или
            </span>
            <span className="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600">
              выберите
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400 dark:text-neutral-400">
            Выберите файл размером до {maxSize}МБ.
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFiles}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
    </>
  )
}

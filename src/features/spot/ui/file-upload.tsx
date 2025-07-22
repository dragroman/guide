"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@shared/ui/button"
import { Card } from "@shared/ui/card"
import { X, Upload, Image as ImageIcon } from "lucide-react"
import { cn } from "@shared/lib/utils"
import Image from "next/image"

interface FileUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  accept?: Record<string, string[]>
  className?: string
}

export function FileUpload({
  files,
  onFilesChange,
  maxFiles = 5,
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
  },
  className,
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
      onFilesChange(newFiles)
    },
    [files, onFilesChange, maxFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onFilesChange(newFiles)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-gray-400",
          isDragActive && "border-blue-400 bg-blue-50",
          files.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-blue-600">Отпустите файлы здесь...</p>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">
              Перетащите изображения сюда или нажмите для выбора
            </p>
            <p className="text-sm text-gray-500">
              Максимум {maxFiles} файлов, до 5МБ каждый
            </p>
          </div>
        )}
      </Card>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <Card key={index} className="relative p-2">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {file.type.startsWith("image/") ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-lg"
                    width={300}
                    height={300}
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

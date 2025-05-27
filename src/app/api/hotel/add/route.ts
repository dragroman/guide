import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@features/auth/session"
import { drupal } from "@shared/lib/drupal"
import fs from "fs/promises"
import os from "os"
import path from "path"

// Функция для сохранения временного файла
async function saveTemporaryFile(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "hotel-image-"))
  const filePath = path.join(tempDir, filename)
  await fs.writeFile(filePath, buffer)
  return filePath
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    const accessToken = session?.accessToken

    if (!accessToken) {
      return NextResponse.json(
        { message: "Отсутствует токен аутентификации" },
        { status: 401 }
      )
    }

    // Получаем FormData из запроса
    const formData = await request.formData()
    const title = formData.get("title") as string
    const imageFile = formData.get("image") as File | null

    if (!title) {
      return NextResponse.json(
        { message: "Название отеля обязательно" },
        { status: 400 }
      )
    }

    let mediaId = null

    // Если есть изображение, сначала создаем медиа-ресурс
    if (imageFile) {
      // Преобразуем File в буфер
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer())

      // Сохраняем файл во временное место
      const tempFilePath = await saveTemporaryFile(imageBuffer, imageFile.name)

      try {
        // Создаем файловый ресурс
        const fileResource = await drupal.createFileResource(
          "file--file",
          {
            data: {
              attributes: {
                type: "media--image", // Тип родительского ресурса
                field: "field_media_image", // Название поля
                filename: imageFile.name, // Имя файла
                file: await fs.readFile(tempFilePath), // Содержимое файла
              },
            },
          },
          {
            withAuth: `Bearer ${accessToken}`,
          }
        )

        // Создаем медиа-ресурс и связываем его с файлом
        const mediaResource = await drupal.createResource(
          "media--image",
          {
            data: {
              attributes: {
                name: `${title} - изображение`,
              },
              relationships: {
                field_media_image: {
                  data: {
                    type: "file--file",
                    id: fileResource.id,
                  },
                },
              },
            },
          },
          {
            withAuth: `Bearer ${accessToken}`,
          }
        )

        mediaId = mediaResource.id

        // Удаляем временный файл
        await fs.unlink(tempFilePath)
      } catch (error) {
        console.error("Ошибка загрузки файла:", error)
        return NextResponse.json(
          { message: "Не удалось загрузить изображение" },
          { status: 500 }
        )
      }
    }

    // Создаем данные для отеля
    let hotelData = {
      data: {
        attributes: {
          title,
        },
        relationships: {} as any,
      },
    }

    // Добавляем связь с медиа если медиа было создано
    if (mediaId) {
      hotelData.data.relationships.field_images = {
        data: [
          {
            type: "media--image",
            id: mediaId,
          },
        ],
      }
    }

    // Создаем отель
    const hotel = await drupal.createResource("node--hotel", hotelData, {
      withAuth: `Bearer ${accessToken}`,
    })

    return NextResponse.json({
      message: "Отель успешно создан",
      hotel,
    })
  } catch (error) {
    console.error("Ошибка создания отеля:", error)

    // Формируем информативное сообщение об ошибке
    let errorMessage = "Внутренняя ошибка сервера"
    let status = 500

    return NextResponse.json({ message: errorMessage }, { status })
  }
}

// Увеличиваем лимит тела запроса для загрузки файлов
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
}

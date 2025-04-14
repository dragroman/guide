// src/components/application/utils/pdfGenerator.ts
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { ApplicationSchemaType } from "../schemas/applicationSchema"
import { getDaysText } from "../utils"
import texts from "../localization/ru"

// Функция для получения локализованного текста опций
const getLocalizedText = (path: string, key: string): string => {
  const parts = path.split(".")
  let current: any = texts

  for (const part of parts) {
    current = current[part]
    if (!current) return key
  }

  return current[key]?.label || key
}

// Генерирует строку из выбранных опций
const formatOptions = (
  options: Record<string, any>,
  path: string,
  skipKeys = ["otherDescription", "_error"]
): string => {
  const selectedOptions = Object.entries(options)
    .filter(([key, value]) => value === true && !skipKeys.includes(key))
    .map(([key]) => getLocalizedText(path, key))
    .join(", ")

  // Добавляем описание для "other" если есть
  const otherDescription =
    options.other && options.otherDescription
      ? `\n${options.otherDescription}`
      : ""

  return selectedOptions ? `${selectedOptions}${otherDescription}` : ""
}

// Проверяет, есть ли выбранные опции
const hasOptions = (
  options: Record<string, any>,
  skipKeys = ["otherDescription", "_error"]
): boolean =>
  Object.entries(options).some(
    ([key, value]) => value === true && !skipKeys.includes(key)
  )

// Форматирование дат
const formatDateRange = (dateRange?: { from?: Date; to?: Date }): string => {
  if (!dateRange?.from || !dateRange?.to) return ""
  return `${format(dateRange.from, "dd.MM.yyyy", { locale: ru })} - ${format(dateRange.to, "dd.MM.yyyy", { locale: ru })}`
}

/**
 * Генерирует PDF с результатами заполнения формы
 * @param formData Данные формы
 * @param locationName Название выбранного города (опционально)
 */
export const generatePdf = async (
  formData: ApplicationSchemaType,
  locationName?: string
): Promise<void> => {
  try {
    // Создаем HTML-шаблон для конвертации в PDF с локальным шрифтом
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Заявка на индивидуальный тур</title>
        <style>
          @font-face {
            font-family: 'Inter';
            src: url('/src/fonts/Inter-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          
          body {
            font-family: 'Inter', Arial, sans-serif;
            padding: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          h1 {
            font-size: 24px;
            color: #111;
            margin-bottom: 5px;
          }
          .date {
            font-size: 12px;
            color: #666;
          }
          .section {
            margin: 15px 0;
            padding-bottom: 10px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            color: #2c3e50;
          }
          .item {
            margin: 8px 0;
          }
          .label {
            font-weight: bold;
            margin-right: 5px;
            display: inline-block;
            min-width: 160px;
          }
          .value {
            display: inline-block;
          }
          .footer {
            margin-top: 20px;
            border-top: 1px solid #eee;
            padding-top: 10px;
            font-size: 12px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Заявка на индивидуальный тур</h1>
          <div class="date">Дата создания: ${format(new Date(), "dd.MM.yyyy HH:mm", { locale: ru })}</div>
        </div>

        <div class="section">
          <div class="section-title">Персональная информация</div>
          <div class="item"><span class="label">Имя:</span> <span class="value">${formData.name}</span></div>
          <div class="item"><span class="label">Количество человек:</span> <span class="value">${formData.peopleCount}</span></div>
          
          ${
            Object.keys(formData.ageGroups).length > 0
              ? `
          <div class="item">
            <span class="label">Возрастные группы:</span> 
            <span class="value">${Object.entries(formData.ageGroups)
              .filter(([_, count]) => count > 0)
              .map(
                ([key, count]) =>
                  `${texts.ageGroups[key as keyof typeof texts.ageGroups] || key}: ${count}`
              )
              .join(", ")}</span>
          </div>
          `
              : ""
          }
          
          ${
            locationName
              ? `
          <div class="item"><span class="label">Город:</span> <span class="value">${locationName}</span></div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">Информация о поездке</div>
          ${
            formatDateRange(formData.trip.dateRange)
              ? `
          <div class="item"><span class="label">Даты поездки:</span> <span class="value">${formatDateRange(formData.trip.dateRange)}</span></div>
          `
              : ""
          }
          
          ${
            formData.trip.daysCount
              ? `
          <div class="item"><span class="label">Продолжительность:</span> <span class="value">${formData.trip.daysCount} ${getDaysText(formData.trip.daysCount)}</span></div>
          `
              : ""
          }
          
          ${
            formatOptions(formData.trip.purpose.options, "tripPurpose.options")
              ? `
          <div class="item"><span class="label">Цель поездки:</span> <span class="value">${formatOptions(formData.trip.purpose.options, "tripPurpose.options").replace(/\n/g, "<br>")}</span></div>
          `
              : ""
          }
        </div>

        ${
          formatOptions(
            formData.accommodation.options,
            "accommodation.options"
          ) ||
          formatOptions(
            formData.accommodation.preferences,
            "accommodation.preferences"
          )
            ? `
        <div class="section">
          <div class="section-title">Размещение</div>
          ${
            formatOptions(
              formData.accommodation.options,
              "accommodation.options"
            )
              ? `
          <div class="item"><span class="label">Тип размещения:</span> <span class="value">${formatOptions(formData.accommodation.options, "accommodation.options").replace(/\n/g, "<br>")}</span></div>
          `
              : ""
          }
          
          ${
            formatOptions(
              formData.accommodation.preferences,
              "accommodation.preferences"
            )
              ? `
          <div class="item"><span class="label">Предпочтения:</span> <span class="value">${formatOptions(formData.accommodation.preferences, "accommodation.preferences").replace(/\n/g, "<br>")}</span></div>
          `
              : ""
          }
        </div>
        `
            : ""
        }

        ${
          formatOptions(formData.transport.transfer, "transport.transfer") ||
          formatOptions(formData.transport.preferences, "transport.preferences")
            ? `
        <div class="section">
          <div class="section-title">Транспорт</div>
          ${
            formatOptions(formData.transport.transfer, "transport.transfer")
              ? `
          <div class="item"><span class="label">Трансфер:</span> <span class="value">${formatOptions(formData.transport.transfer, "transport.transfer").replace(/\n/g, "<br>")}</span></div>
          `
              : ""
          }
          
          ${
            formatOptions(
              formData.transport.preferences,
              "transport.preferences"
            )
              ? `
          <div class="item"><span class="label">Предпочтения:</span> <span class="value">${formatOptions(formData.transport.preferences, "transport.preferences").replace(/\n/g, "<br>")}</span></div>
          `
              : ""
          }
        </div>
        `
            : ""
        }

        ${
          formatOptions(formData.food.cuisine, "food.cuisine") ||
          formatOptions(formData.food.preferences, "food.preferences")
            ? `
        <div class="section">
          <div class="section-title">Питание</div>
          ${
            formatOptions(formData.food.cuisine, "food.cuisine")
              ? `
          <div class="item"><span class="label">Предпочтения по кухне:</span> <span class="value">${formatOptions(formData.food.cuisine, "food.cuisine").replace(/\n/g, "<br>")}</span></div>
          `
              : ""
          }
          
          ${
            formatOptions(formData.food.preferences, "food.preferences")
              ? `
          <div class="item"><span class="label">Особые требования:</span> <span class="value">${formatOptions(formData.food.preferences, "food.preferences").replace(/\n/g, "<br>")}</span></div>
          `
              : ""
          }
        </div>
        `
            : ""
        }

        ${
          formatOptions(formData.shopping.budget, "shopping.budget") ||
          formatOptions(formData.shopping.shoppingPlaces, "shopping.places") ||
          formatOptions(formData.shopping.shoppingTime, "shopping.time") ||
          formData.shopping.specialWishes
            ? `
        <div class="section">
          <div class="section-title">Шоппинг</div>
          ${
            formatOptions(formData.shopping.budget, "shopping.budget")
              ? `
          <div class="item"><span class="label">Бюджет на шоппинг:</span> <span class="value">${formatOptions(formData.shopping.budget, "shopping.budget")}</span></div>
          `
              : ""
          }
          
          ${
            formatOptions(formData.shopping.shoppingPlaces, "shopping.places")
              ? `
          <div class="item"><span class="label">Места для шоппинга:</span> <span class="value">${formatOptions(formData.shopping.shoppingPlaces, "shopping.places").replace(/\n/g, "<br>")}</span></div>
          `
              : ""
          }
          
          ${
            formatOptions(formData.shopping.shoppingTime, "shopping.time")
              ? `
          <div class="item"><span class="label">Время на шоппинг:</span> <span class="value">${formatOptions(formData.shopping.shoppingTime, "shopping.time")}</span></div>
          `
              : ""
          }
          
          ${
            formData.shopping.specialWishes
              ? `
          <div class="item"><span class="label">Особые пожелания:</span> <span class="value">${formData.shopping.specialWishes}</span></div>
          `
              : ""
          }
        </div>
        `
            : ""
        }

        <div class="section">
          <div class="section-title">Бюджет и дополнительные услуги</div>
          ${
            formData.budget
              ? `
          <div class="item"><span class="label">Бюджет на человека:</span> <span class="value">${formData.budget.toLocaleString("ru-RU")} ₽</span></div>
          `
              : ""
          }
          
          ${
            formData.needVisa
              ? `
          <div class="item"><span class="label">Виза:</span> <span class="value">Требуется</span></div>
          `
              : ""
          }
          
          ${
            formData.needInsurance
              ? `
          <div class="item"><span class="label">Страховка:</span> <span class="value">Требуется</span></div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">Контактная информация</div>
          ${
            formData.contact.phone
              ? `
          <div class="item"><span class="label">Телефон:</span> <span class="value">${formData.contact.phone}</span></div>
          `
              : ""
          }
          
          ${
            formData.contact.email
              ? `
          <div class="item"><span class="label">Email:</span> <span class="value">${formData.contact.email}</span></div>
          `
              : ""
          }
          
          ${
            formData.contact.wechat
              ? `
          <div class="item"><span class="label">WeChat:</span> <span class="value">${formData.contact.wechat}</span></div>
          `
              : ""
          }
          
          ${
            formData.contact.telegram
              ? `
          <div class="item"><span class="label">Telegram:</span> <span class="value">${formData.contact.telegram}</span></div>
          `
              : ""
          }
          
          ${
            formData.contact.whatsapp
              ? `
          <div class="item"><span class="label">WhatsApp:</span> <span class="value">${formData.contact.whatsapp}</span></div>
          `
              : ""
          }
        </div>

        <div class="footer">
          Сгенерировано системой chinq.ru | ${format(new Date(), "yyyy-MM-dd")}
        </div>
      </body>
      </html>
    `

    // Создаем элемент с HTML-контентом
    const element = document.createElement("div")
    element.innerHTML = htmlContent
    document.body.appendChild(element)

    // Встраиваем шрифт как Blob URL для надежности
    const fontUrl = "/src/fonts/Inter-Regular.woff2"
    const fontResponse = await fetch(fontUrl)
    const fontBlob = await fontResponse.blob()
    const fontBlobUrl = URL.createObjectURL(fontBlob)

    // Обновляем стиль с новым URL
    const styleElement = document.createElement("style")
    styleElement.innerHTML = `
      @font-face {
        font-family: 'Inter';
        src: url('${fontBlobUrl}') format('woff2');
        font-weight: normal;
        font-style: normal;
      }
    `
    document.head.appendChild(styleElement)

    // Импортируем библиотеку html2pdf динамически
    // @ts-ignore: Missing type definitions for html2pdf.js
    const html2pdf = await import("html2pdf.js").then(
      (module) => module.default || module
    )

    // Настройки для PDF
    const opt = {
      margin: 10,
      filename: `заявка_${formData.name}_${format(new Date(), "yyyy-MM-dd", { locale: ru })}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    }

    // Генерируем PDF
    await html2pdf().from(element).set(opt).save()

    // Очистка ресурсов
    URL.revokeObjectURL(fontBlobUrl)
    document.body.removeChild(element)
    document.head.removeChild(styleElement)
  } catch (error) {
    console.error("Ошибка при создании PDF:", error)
    alert("Произошла ошибка при создании PDF. Пожалуйста, попробуйте еще раз.")
  }
}

export default generatePdf

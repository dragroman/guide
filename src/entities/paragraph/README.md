// Пример использования ParagraphRenderer

import { ParagraphRenderer } from '@/entities/paragraph'

// В компоненте страницы
<ParagraphRenderer 
  paragraphs={node.field_body} 
  className="prose max-w-none"
/>

import { drupal } from '@/lib/drupal'
import {
ParagraphRenderer,
createParagraphs,
createParagraphReferences,
type CreateParagraphData
} from '@/entities/paragraph'

// 1. ОТОБРАЖЕНИЕ ПАРАГРАФОВ НА СТРАНИЦЕ
export default async function ArticlePage({ params }: { params: { slug: string } }) {
// Получаем узел с параграфами
const node = await drupal.getResource('node--article', params.slug, {
params: {
include: [
'field_body',
'field_body.field_image',
'field_body.field_image.field_media_image',
'field_body.field_images',
'field_body.field_images.field_media_image',
'field_body.field_video_file',
'field_body.field_video_file.field_media_video_file'
].join(',')
}
})

return (

<article>
<h1>{node.title}</h1>

      {/* Рендерим параграфы */}
      <ParagraphRenderer
        paragraphs={node.field_body}
        className="prose max-w-none mt-8"
      />
    </article>

)
}

// 2. СОЗДАНИЕ ПАРАГРАФОВ ПРИ СОЗДАНИИ УЗЛА
export async function createArticleWithParagraphs() {
try {
// Подготавливаем данные параграфов
const paragraphsData: CreateParagraphData[] = [
{
type: 'text',
title: 'Введение',
body: '<p>Это вводный текст статьи.</p>',
format: 'full_html'
},
{
type: 'image',
title: 'Главное изображение',
imageId: 'media-image-uuid-here',
alt: 'Описание изображения'
},
{
type: 'text_image',
title: 'О компании',
body: '<p>Текст о компании рядом с изображением.</p>',
imageId: 'another-media-uuid',
imagePosition: 'left'
},
{
type: 'gallery',
title: 'Наши работы',
imageIds: ['image-1-uuid', 'image-2-uuid', 'image-3-uuid'],
columns: 3
},
{
type: 'video',
title: 'Видео презентация',
videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
caption: 'Наша презентация'
},
{
type: 'quote',
quoteText: 'Отличная работа! Рекомендуем всем.',
author: 'Иван Иванов',
source: 'Директор компании ABC'
}
]

    // Создаем параграфы
    const paragraphIds = await createParagraphs(drupal, paragraphsData)

    // Создаем ссылки для связывания с узлом
    const paragraphReferences = createParagraphReferences(
      paragraphIds,
      paragraphsData.map(p => p.type)
    )

    // Создаем узел со связанными параграфами
    const article = await drupal.createResource('node--article', {
      data: {
        type: 'node--article',
        attributes: {
          title: 'Новая статья с параграфами',
          status: true
        },
        relationships: {
          field_body: {
            data: paragraphReferences
          }
        }
      }
    }, {
      withAuth: true
    })

    return article

} catch (error) {
console.error('Ошибка при создании статьи:', error)
throw error
}
}

// 3. КАСТОМИЗАЦИЯ КОМПОНЕНТОВ ПАРАГРАФОВ
import { CustomTextParagraph } from '@/components/custom-paragraphs'

export function CustomArticlePage({ paragraphs }: { paragraphs: any[] }) {
return (
<ParagraphRenderer
paragraphs={paragraphs}
components={{
        // Переопределяем компонент для текстовых параграфов
        text: CustomTextParagraph,
        // Остальные компоненты используют стандартную реализацию
      }}
/>
)
}

// 4. ИСПОЛЬЗОВАНИЕ ОТДЕЛЬНЫХ КОМПОНЕНТОВ
import { TextParagraph, ImageParagraph } from '@/entities/paragraph'

export function SpecificParagraphUsage({ textParagraph, imageParagraph }: any) {
return (

<div>
{/_ Используем компоненты напрямую _/}
<TextParagraph paragraph={textParagraph} className="mb-8" />
<ImageParagraph paragraph={imageParagraph} priority />
</div>
)
}

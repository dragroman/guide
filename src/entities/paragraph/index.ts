// Экспорт типов
export * from "./model/types"

// Экспорт API функций
export {
  createParagraphs,
  createParagraphReferences,
  getParagraphsWithMedia,
} from "./api/paragraphApi"

// Экспорт основного компонента
export { ParagraphRenderer } from "./ui/ParagraphRenderer"
export type { ParagraphRendererProps } from "./model/types"

// Экспорт отдельных компонентов для переиспользования
export { TextParagraph } from "./ui/components/TextParagraph"
export { ImageParagraph } from "./ui/components/ImageParagraph"
export { TextImageParagraph } from "./ui/components/TextImageParagraph"

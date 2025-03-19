// src/components/application/utils/scrollUtils.ts
// Эти утилиты используются для улучшения UX при навигации по многошаговой форме

/**
 * Плавная прокрутка к верху формы
 */
export function scrollToFormTop() {
  // Даем небольшую задержку, чтобы DOM успел обновиться
  setTimeout(() => {
    // Находим основной контейнер формы и прокручиваем к нему
    const formContainer = document.querySelector("form")

    if (formContainer) {
      // Учитываем фиксированную навигацию, поэтому добавляем отступ сверху
      const offsetTop =
        formContainer.getBoundingClientRect().top + window.scrollY - 120

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }, 50)
}

/**
 * Плавная прокрутка к первому элементу с ошибкой
 * @param errors Объект с ошибками из react-hook-form
 */
export function scrollToFirstError(errors: Record<string, any>) {
  if (!errors || Object.keys(errors).length === 0) return

  // Даем немного времени для отрисовки полей с ошибками
  setTimeout(() => {
    // Поиск полей с ошибками в определенном порядке:
    // 1. Сначала ищем поля с border-destructive (поля ввода)
    // 2. Затем ищем элементы с text-destructive (сообщения об ошибках)
    // 3. В крайнем случае, ищем элементы, содержащие сообщения об ошибках в CardSelector
    const selectors = [
      ".border-destructive",
      "p.text-destructive",
      ".text-destructive",
    ]

    let firstErrorField = null

    // Перебираем селекторы в порядке приоритета
    for (const selector of selectors) {
      firstErrorField = document.querySelector(selector)
      if (firstErrorField) break
    }

    if (firstErrorField) {
      // Находим родительский контейнер поля для более точной прокрутки
      const fieldContainer =
        firstErrorField.closest("div.space-y-2, div.space-y-4") ||
        firstErrorField

      // Вычисляем позицию с учетом фиксированного хедера
      const offsetTop =
        fieldContainer.getBoundingClientRect().top + window.scrollY - 150

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }, 100) // Задержка 100мс для гарантии, что DOM обновлен
}

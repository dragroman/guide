/**
 * Форматирует число, добавляя пробелы в качестве разделителей разрядов
 *
 * @param num Число для форматирования
 * @returns Отформатированная строка с разделителями
 */
export function formatNumberWithSpaces(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

/**
 * Форматирует денежную сумму с символом валюты
 *
 * @param amount Сумма для форматирования
 * @param currency Символ валюты (по умолчанию ₽)
 * @returns Отформатированная строка с символом валюты
 */
export function formatCurrency(amount: number, currency: string = "₽"): string {
  return `${formatNumberWithSpaces(amount)} ${currency}`
}

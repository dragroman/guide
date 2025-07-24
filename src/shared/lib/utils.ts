import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input
  }

  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export function getDaysText(days: number): string {
  if (days % 10 === 1 && days % 100 !== 11) {
    return "день"
  } else if (
    [2, 3, 4].includes(days % 10) &&
    ![12, 13, 14].includes(days % 100)
  ) {
    return "дня"
  } else {
    return "дней"
  }
}

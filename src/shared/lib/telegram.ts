// src/shared/lib/telegram.ts

interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: "HTML" | "Markdown"
}

export async function sendTelegramMessage(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN

  if (!botToken) {
    console.error("TELEGRAM_BOT_TOKEN не настроен")
    return false
  }

  const proxyUrl = process.env.TELEGRAM_PROXY_URL
  const chatId = process.env.TELEGRAM_CHAT_ID

  try {
    const payload = JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    } as TelegramMessage)

    if (proxyUrl) {
      // Используем node-fetch с прокси для локальной разработки
      const { default: fetch } = await import("node-fetch")
      const { SocksProxyAgent } = await import("socks-proxy-agent")

      const agent =
        proxyUrl.startsWith("socks") && new SocksProxyAgent(proxyUrl)

      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
          agent,
        }
      )

      if (!response.ok) {
        const error = await response.text()
        console.error("Ошибка отправки в Telegram:", error)
        return false
      }
    } else {
      // Используем обычный fetch без прокси
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        }
      )

      if (!response.ok) {
        const error = await response.text()
        console.error("Ошибка отправки в Telegram:", error)
        return false
      }
    }

    return true
  } catch (error) {
    console.error("Ошибка при отправке сообщения в Telegram:", error)
    return false
  }
}

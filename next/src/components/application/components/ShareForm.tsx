import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check, Copy, X } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ShareLinkButtonProps {
  formId?: string // ID формы, если нужно
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Component for sharing a form with a link.
 *
 * @example
 * 
/******  4d8da049-73af-4f19-9d31-1a90216e89bd  *******/
export function ShareForm({ formId }: ShareLinkButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showError, setShowError] = useState(false)
  const [expertEmail, setExpertEmail] = useState("")

  // Генерация ссылки для шаринга
  const generateShareLink = () => {
    if (!expertEmail || !isValidEmail(expertEmail)) {
      setShowError(true)
      return null
    }

    setShowError(false)
    const currentUrl = window.location.origin + window.location.pathname
    return `${currentUrl}?email=${encodeURIComponent(expertEmail)}`
  }

  // Проверка валидности email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Обработка изменения email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpertEmail(e.target.value)
    if (showError && isValidEmail(e.target.value)) {
      setShowError(false)
    }
  }

  // Копирование ссылки в буфер обмена
  const copyToClipboard = () => {
    const shareLink = generateShareLink()
    if (!shareLink) return

    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Не удалось скопировать ссылку:", err)
      })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 mt-2">
          <Share2 className="h-4 w-4" />
          Поделиться формой
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Поделиться формой</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => setOpen(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="share-email">Email получателя результатов</Label>
            <div className="text-xs text-muted-foreground mb-2">
              Укажите email, который будет получать результаты заполнения формы
            </div>
            <Input
              id="share-email"
              value={expertEmail}
              onChange={handleEmailChange}
              placeholder="example@mail.com"
              className={showError ? "border-destructive" : ""}
            />
            {showError && (
              <p className="text-sm text-destructive">
                Укажите корректный email адрес
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={copyToClipboard} className="w-full gap-2">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Скопировано!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Копировать ссылку
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Поделитесь ссылкой с другими людьми, и результаты их заполнения
            формы будут отправлены на указанный вами email.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

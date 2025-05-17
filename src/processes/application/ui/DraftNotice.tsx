import React from "react"
import { Button } from "@shared/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@shared/ui/alert"

interface DraftNoticeProps {
  onLoad: () => void
  onIgnore: () => void
}

export function DraftNotice({ onLoad, onIgnore }: DraftNoticeProps) {
  return (
    <Alert className="mb-6">
      <AlertTitle>Черновик формы</AlertTitle>
      <AlertDescription>
        <p>У вас есть несохраненный черновик формы.</p>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={onLoad}>
            Восстановить
          </Button>
          <Button variant="ghost" size="sm" onClick={onIgnore}>
            Игнорировать
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Minus, Plus } from "lucide-react"

interface PeopleCounterProps {
  label?: string
  description?: string
  min?: number
  max?: number
  onChange?: (count: number) => void
}

export function PeopleCounter({
  label = "Количество путешественников",
  description = "Укажите общее число участников поездки",
  min = 1,
  max = 10,
  onChange,
}: PeopleCounterProps) {
  const [count, setCount] = useState(min)

  const handleIncrement = () => {
    if (count < max) {
      const newCount = count + 1
      setCount(newCount)
      onChange?.(newCount)
    }
  }

  const handleDecrement = () => {
    if (count > min) {
      const newCount = count - 1
      setCount(newCount)
      onChange?.(newCount)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={count <= min}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-2xl font-bold min-w-[40px] text-center">
          {count}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={count >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {max < 10 && (
        <p className="text-xs text-muted-foreground">
          Максимальное количество: {max}
        </p>
      )}
    </div>
  )
}

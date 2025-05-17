"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@shared/ui/button"
import { cn } from "@shared/lib/utils"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@shared/ui/drawer"
import { Badge } from "@shared/ui/badge"
import { Minus, Plus, Users } from "lucide-react"

// Обновленные определения возрастных групп с иконками Lucide
export const ageGroups = [
  { id: "infants", label: "Дети до 2 лет" },
  { id: "toddlers", label: "Дети 3-6 лет" },
  { id: "children", label: "Дети 7-12 лет" },
  { id: "teens", label: "Подростки 13-17 лет" },
  { id: "adults", label: "Взрослые 18-69 лет" },
  { id: "seniors", label: "Пожилые 70+ лет" },
]

export type AgeGroupCounts = { [key: string]: number }

interface AgeGroupDrawerProps {
  label?: string
  description?: string
  onChange?: (groups: AgeGroupCounts) => void
  value?: AgeGroupCounts
  className?: string
}

export function AgeGroupDrawer({
  label = "Путешественники",
  description,
  onChange,
  value,
  className,
}: AgeGroupDrawerProps) {
  const defaultCounts: AgeGroupCounts = { adults: 1 }
  const [counts, setCounts] = useState<AgeGroupCounts>(value || defaultCounts)
  const [isOpen, setIsOpen] = useState(false)
  const [tempCounts, setTempCounts] = useState<AgeGroupCounts>({ ...counts })

  useEffect(() => {
    if (value) {
      setCounts(value)
      setTempCounts({ ...value })
    }
  }, [value])

  const handleCountChange = (groupId: string, newCount: number) => {
    const updatedCounts = { ...tempCounts }

    if (newCount === 0) {
      delete updatedCounts[groupId]

      if (Object.keys(updatedCounts).length === 0) {
        updatedCounts.adults = 1
      }
    } else {
      updatedCounts[groupId] = newCount
    }

    setTempCounts(updatedCounts)
  }

  const handleApply = () => {
    setCounts({ ...tempCounts })
    onChange?.({ ...tempCounts })
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setTempCounts({ ...counts })
    } else {
      // При закрытии без сохранения - сбрасываем
      setTempCounts({ ...counts })
    }
  }

  const totalTravelers = Object.values(counts).reduce(
    (sum, count) => sum + count,
    0
  )

  const getPluralForm = (number: number): string => {
    const forms = ["человек", "человека", "человек"]
    const cases = [2, 0, 1, 1, 1, 2]
    return forms[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[Math.min(number % 10, 5)]
    ]
  }

  // Формируем краткое описание для кнопки
  const getSummary = () => {
    if (totalTravelers === 0) return "Не выбрано"

    // Если только взрослые - показываем "2 взрослых"
    if (Object.keys(counts).length === 1 && counts.adults) {
      return `${counts.adults} ${counts.adults === 1 ? "взрослый" : "взрослых"}`
    }

    // Иначе показываем общее количество людей
    return `${totalTravelers} ${getPluralForm(totalTravelers)}`
  }

  return (
    <div className={cn("", className)}>
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 text-base font-normal"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{label}</span>
              </div>
              <Badge variant={totalTravelers > 0 ? "default" : "outline"}>
                {getSummary()}
              </Badge>
            </div>
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader className="px-4 py-3 border-b">
              <DrawerTitle className="text-lg">{label}</DrawerTitle>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </DrawerHeader>

            <div className="overflow-y-auto">
              <div className="p-3 flex flex-wrap justify-between">
                {ageGroups.map((group) => {
                  const count = tempCounts[group.id] || 0
                  const isActive = count > 0

                  return (
                    <div
                      key={group.id}
                      className={cn(
                        "w-[48%] mb-3 border rounded-lg p-3 transition-all duration-200",
                        isActive
                          ? "border-primary"
                          : "opacity-60 hover:opacity-80"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span
                            className={cn(
                              "text-sm font-medium",
                              isActive ? "text-primary" : ""
                            )}
                          >
                            {group.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <Button
                          type="button"
                          variant={isActive ? "outline" : "ghost"}
                          size="sm"
                          className={cn(
                            "h-8 w-8 p-0",
                            isActive ? "border-primary/50" : ""
                          )}
                          onClick={() =>
                            handleCountChange(group.id, Math.max(0, count - 1))
                          }
                          disabled={count === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        <span
                          className={cn(
                            "w-6 text-center font-medium",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {count}
                        </span>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className={cn(
                            "h-8 w-8 p-0",
                            isActive ? "border-primary/50" : ""
                          )}
                          onClick={() => handleCountChange(group.id, count + 1)}
                          disabled={count >= 10}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <DrawerFooter className="px-4 py-3 border-t">
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">
                  Всего:{" "}
                  {Object.values(tempCounts).reduce(
                    (sum, count) => sum + count,
                    0
                  )}{" "}
                  чел.
                </div>
                <div className="flex gap-2">
                  <DrawerClose asChild>
                    <Button variant="outline" size="sm">
                      Отмена
                    </Button>
                  </DrawerClose>
                  <Button size="sm" onClick={handleApply}>
                    Применить
                  </Button>
                </div>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

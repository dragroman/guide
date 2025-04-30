"use client"
import { ReactNode, useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TourTab {
  id: string
  label: string
  content: ReactNode
}

interface TourTabsContainerProps {
  tabs: TourTab[]
  defaultTab?: string
  onTabChange?: (tabId: string) => void
}

export const TourDetailContainer = ({
  tabs,
  defaultTab,
  onTabChange,
}: TourTabsContainerProps) => {
  const [showScrollHint, setShowScrollHint] = useState(true)
  const [isSticky, setIsSticky] = useState(false)

  // В useEffect:
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false)
    }, 3000) // Скрыть подсказку через 3 секунды

    return () => clearTimeout(timer)
  }, [])

  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "")

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsSticky(offset > 150) // Подстройте это значение по необходимости
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Tabs
      defaultValue={defaultTab || tabs[0]?.id}
      className="mb-6"
      onValueChange={onTabChange}
    >
      <div
        className={`sticky md:relative top-[52px] md:top-0 z-50 mx-[-2rem] md:mx-0 md:px-2`}
        style={{ position: "-webkit-sticky" }} // Решение для iOS Safari
      >
        {/* Визуальные индикаторы прокрутки */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-background to-transparent w-8 h-full pointer-events-none z-10 flex items-center">
          <ChevronLeft
            className="text-primary ml-1 animate-pulse md:hidden"
            size={16}
          />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-background to-transparent w-8 h-full pointer-events-none z-10 flex items-center justify-end">
          <ChevronRight
            className="text-primary mr-1 animate-pulse md:hidden"
            size={16}
          />
        </div>

        <ScrollArea className="w-full pb-2">
          <div className="relative">
            <TabsList className="inline-flex w-max px-2">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>

        {showScrollHint && (
          <div className="absolute inset-0 bg-black/5 rounded flex items-center justify-center md:hidden animate-fadeOut">
            <div className="flex items-center bg-white/90 px-3 py-1.5 rounded-full shadow-sm">
              <ChevronLeft size={16} className="text-primary" />
              <span className="mx-1 text-xs font-medium">
                Прокрутите для просмотра
              </span>
              <ChevronRight size={16} className="text-primary" />
            </div>
          </div>
        )}
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="space-y-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

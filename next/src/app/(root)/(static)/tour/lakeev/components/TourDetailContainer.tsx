"use client"
// components/tours/TourTabsContainer.tsx
import { ReactNode, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "")

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <Tabs
      defaultValue={defaultTab || tabs[0]?.id}
      className="mb-6"
      onValueChange={handleTabChange}
    >
      <TabsList className={``}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="space-y-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

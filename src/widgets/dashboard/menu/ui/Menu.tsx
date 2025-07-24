"use client"

import { Edit, LogOut, Cog, Luggage, LucideIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface MenuItem {
  icon: LucideIcon
  title: string
  path?: string
  onClick?: () => void
}

const menuItems = [
  { icon: Edit, title: "Анкеты", path: "/dashboard/application" },
  { icon: Luggage, title: "Туры", path: "/dashboard/tour" },
  { icon: Cog, title: "Настройки", path: "/dashboard/settings" },
  { icon: LogOut, title: "Выход", onClick: () => signOut() },
]

export const DashboardMenu = () => {
  const router = useRouter()

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick()
    } else if (item.path) {
      router.push(item.path)
    }
  }
  return (
    <div className="rounded-xl bg-card text-card-foreground">
      <div className="grid grid-cols-4 gap-4 text-center">
        {menuItems.map((item, index) => (
          <div
            className="flex flex-col gap-2 border items-center p-4 hover:bg-accent rounded-lg cursor-pointer transition-colors"
            onClick={() => handleItemClick(item)}
            key={item.path || index}
          >
            <div className="text-2xl">
              <item.icon size={24} />
            </div>
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

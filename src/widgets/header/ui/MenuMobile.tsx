import { MapPin, Menu } from "lucide-react"
import { Button } from "@shared/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@shared/ui/drawer"
import Link from "next/link"
import { navigationItems } from "./Nav"
import { useState } from "react"
import { cn } from "@shared/lib/utils"
import { SOCIAL } from "@shared/lib/constants"

export default function MenuMobile({
  isScrolled,
  className,
  shouldBeTransparent,
}: {
  isScrolled?: boolean
  shouldBeTransparent?: boolean
  className?: string
}) {
  const t = SOCIAL
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const getMenuButtonStyle = () => {
    return cn(
      "p-2 rounded-md",
      shouldBeTransparent ? "text-white" : "text-foreground",
      className
    )
  }
  return (
    <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={getMenuButtonStyle()}
          aria-label="Меню"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl">Навигация</DrawerTitle>
          <DrawerDescription className="text-center">
            Выберите раздел сайта
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <div className="flex flex-col gap-6 pb-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn("flex items-center px-2 rounded-md")}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </div>
          <hr className="separator" />
          <div className="bg-slate-100 py-4 space-y-2">
            <div className="text-center">Мы в социальных сетях</div>
            <div className="flex justify-center space-x-4">
              <a target="_blank" href={t.instagram.link}>
                <Button variant="outline">
                  <t.instagram.icon /> {t.instagram.label}
                </Button>
              </a>
              <a target="_blank" href={t.telegram.link}>
                <Button variant="outline">
                  <t.telegram.icon /> {t.telegram.label}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

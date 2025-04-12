import { MapPin, Menu } from "lucide-react"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import Link from "next/link"
import { navigationItems } from "./Header"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function MenuMobile({
  isScrolled,
  className,
}: {
  isScrolled?: boolean
  className?: string
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const getMenuButtonStyle = () => {
    return cn(
      "p-2 rounded-md",
      isScrolled ? "text-foreground" : "text-white",
      className
    )
  }
  return (
    <div className="md:hidden">
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
          <div className="p-4 flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn("flex items-center py-4 px-4 rounded-md")}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            <Link
              href="/application"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-4 px-4 rounded-md bg-primary/10 text-primary font-medium"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Подобрать тур
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu, X, Home, BookOpen, Phone, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

// Список путей, где хедер должен быть прозрачным
const TRANSPARENT_PATHS = [""]

// Структура данных для пунктов навигации
const navigationItems = [
  { title: "Главная", href: "/", icon: <Home className="h-5 w-5 mr-2" /> },
  { title: "Блог", href: "/blog", icon: <BookOpen className="h-5 w-5 mr-2" /> },
  {
    title: "Контакт",
    href: "/contact",
    icon: <Phone className="h-5 w-5 mr-2" />,
  },
]

export function Header({ className }: { className?: string }) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const shouldBeTransparent = TRANSPARENT_PATHS.includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getHeaderStyle = () => {
    if (isScrolled || !shouldBeTransparent) {
      return "bg-background/95 backdrop-blur-sm shadow-sm border-b border-border/40"
    }
    return "bg-transparent"
  }

  const getLinkStyle = (isActive: boolean) => {
    const baseStyles =
      "relative px-3 py-2 rounded-md font-medium transition-colors"

    // Стили для активного/неактивного состояния
    const activeStyles = "text-primary"
    const inactiveStyles =
      isScrolled || !shouldBeTransparent
        ? "text-foreground hover:text-primary hover:bg-muted/50"
        : "text-white/90 hover:text-white hover:bg-white/10"

    return cn(baseStyles, isActive ? activeStyles : inactiveStyles)
  }

  const getLogoStyle = () => {
    return cn(
      "text-2xl font-bold font-mono no-underline",
      isScrolled || !shouldBeTransparent ? "text-foreground" : "text-white"
    )
  }

  const getMenuButtonStyle = () => {
    return cn(
      "p-2 rounded-md",
      isScrolled || !shouldBeTransparent ? "text-foreground" : "text-white"
    )
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
        getHeaderStyle(),
        className
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className={getLogoStyle()}>
            Haohub<span className="text-primary">.</span>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getLinkStyle(pathname === item.href)}
              >
                {item.title}
              </Link>
            ))}

            <div className="ml-4">
              <Link href="/application">
                <Button
                  className={cn(
                    "px-4",
                    isScrolled || !shouldBeTransparent
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-white hover:bg-white/90 text-primary"
                  )}
                >
                  Подобрать тур
                </Button>
              </Link>
            </div>
          </div>

          {/* Мобильное меню с использованием Drawer */}
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
                  <DrawerTitle className="text-center text-xl">
                    Навигация
                  </DrawerTitle>
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
                      className={cn(
                        "flex items-center py-4 px-4 rounded-md",
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted"
                      )}
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
        </nav>
      </div>
    </header>
  )
}

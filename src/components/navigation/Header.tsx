"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Phone, Info, User2 } from "lucide-react"
import { cn } from "@/lib/utils"
import MenuMobile from "./MenuMobile"

// Список путей, где хедер должен быть прозрачным
const TRANSPARENT_PATHS = ["/", "/application"]

// Структура данных для пунктов навигации
export const navigationItems = [
  { title: "Главная", href: "/", icon: <Home className="h-5 w-5 mr-2" /> },
  {
    title: "О проекте",
    href: "/more",
    icon: <Info className="h-5 w-5 mr-2" />,
  },

  {
    title: "Для эксперта",
    href: "/expert",
    icon: <User2 className="h-5 w-5 mr-2" />,
  },
  {
    title: "Подобрать тур",
    href: "/application",
    icon: <BookOpen className="h-5 w-5 mr-2" />,
  },
  // { title: "Блог", href: "/blog", icon: <BookOpen className="h-5 w-5 mr-2" /> },
  // {
  //   title: "Контакт",
  //   href: "/contact",
  //   icon: <Phone className="h-5 w-5 mr-2" />,
  // },
]

export function Header({ className }: { className?: string }) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

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
      "text-2xl font-bold no-underline",
      isScrolled || !shouldBeTransparent ? "text-foreground" : "text-white"
    )
  }
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2",
        getHeaderStyle(),
        className
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className={getLogoStyle()}>
            chinq<span className="text-primary">.</span>
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
          </div>

          {/* Мобильное меню с использованием Drawer */}
          <MenuMobile
            isScrolled={isScrolled}
            shouldBeTransparent={shouldBeTransparent}
          />
        </nav>
      </div>
    </header>
  )
}

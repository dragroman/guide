"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@shared/lib/utils"
import MenuMobile from "./MenuMobile"
import { Logo } from "./Logo"
import { navigationItems } from "./Nav"

import { EditIcon, User } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "@shared/ui/button"

// Список путей, где хедер должен быть прозрачным
const TRANSPARENT_PATHS = ["/", "/application"]

export function Header({ className }: { className?: string }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)

  const isTransparentPage = TRANSPARENT_PATHS.includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      // Если прокрутка больше 50px, считаем, что страница прокручена
      setIsScrolled(window.scrollY > 50)
    }

    // Инициализация состояния при загрузке
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Определяем стили хедера на основе состояния и типа страницы
  const headerStyles = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
    {
      // Стиль по умолчанию (не прозрачный)
      "bg-background/95 backdrop-blur-sm shadow-sm border-b border-border/40":
        !isTransparentPage || isScrolled,

      // Стиль для прозрачных страниц без прокрутки
      "bg-transparent": isTransparentPage && !isScrolled,
    },
    className
  )

  // Определяем стили для ссылок в меню
  const getLinkStyle = (isActive: boolean) => {
    const baseStyles = "relative px-3 py-2 font-medium transition-colors"

    // На прозрачных страницах без прокрутки используем светлые тексты
    if (isTransparentPage && !isScrolled) {
      return cn(
        baseStyles,
        isActive
          ? "text-white font-semibold"
          : "text-white/90 hover:text-white hover:bg-white/10"
      )
    }

    // В остальных случаях используем стандартные темные тексты
    return cn(
      baseStyles,
      isActive
        ? "text-primary font-semibold"
        : "text-foreground/70 hover:text-foreground"
    )
  }

  return (
    <header className={headerStyles}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between md:justify-center h-4">
          {/* Логотип */}
          <Logo
            isScrolled={isScrolled}
            shouldBeTransparent={isTransparentPage && !isScrolled}
          />

          {/* Десктопное меню */}
          <div className="hidden md:flex md:flex-none items-center space-x-1">
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

          {/* Мобильное меню */}

          <div className="flex items-center gap-2">
            <MenuMobile
              className="md:hidden"
              isScrolled={isScrolled}
              shouldBeTransparent={isTransparentPage && !isScrolled}
            />
            <Button
              variant="ghost"
              className={`${isTransparentPage && "text-white hover:text-black"}`}
              size="icon"
              aria-label="Меню"
              asChild
            >
              <Link href={session ? "/dashboard" : "/signin"}>
                <User className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

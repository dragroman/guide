"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Список путей, где хедер должен быть прозрачным
const TRANSPARENT_PATHS = ["/"]

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !shouldBeTransparent
            ? "bg-white/95 backdrop-blur-sm shadow-sm py-3"
            : "bg-transparent py-3"
        }`,
        className
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Логотип */}
          <Link
            href="/"
            className={`text-2xl font-bold font-mono no-underline ${
              isScrolled || !shouldBeTransparent
                ? "text-gray-900"
                : "text-white"
            }`}
          >
            Haohub<span className="text-pink-500">.</span>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              href="/"
              isScrolled={isScrolled}
              isTransparent={shouldBeTransparent}
            >
              Главная
            </NavLink>
            <NavLink
              href="/blog"
              isScrolled={isScrolled}
              isTransparent={shouldBeTransparent}
            >
              Блог
            </NavLink>
            <NavLink
              href="/contact"
              isScrolled={isScrolled}
              isTransparent={shouldBeTransparent}
            >
              Контакт
            </NavLink>
            <div className="ml-4">
              <Link href="/application">
                <Button
                  className={`px-4 ${
                    isScrolled || !shouldBeTransparent
                      ? "bg-pink-600 hover:bg-pink-700 text-white"
                      : "bg-white hover:bg-white/90 text-pink-600"
                  }`}
                >
                  Подобрать тур
                </Button>
              </Link>
            </div>
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${
                isScrolled || !shouldBeTransparent
                  ? "text-gray-900"
                  : "text-white"
              }`}
              aria-label="Меню"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Мобильное меню (выпадающее) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
              Главная
            </MobileNavLink>
            <MobileNavLink
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
            >
              Блог
            </MobileNavLink>
            <MobileNavLink
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Контакт
            </MobileNavLink>
            <div className="pt-4 border-t border-gray-100">
              <Link href="/application">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  Подобрать тур
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({
  href,
  children,
  isScrolled,
  isTransparent,
}: {
  href: string
  children: React.ReactNode
  isScrolled: boolean
  isTransparent: boolean
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        isScrolled || !isTransparent
          ? "text-gray-700 hover:text-pink-600"
          : "text-white/90 hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      className="block py-3 px-4 border-b border-gray-100 text-gray-700 hover:text-pink-600"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

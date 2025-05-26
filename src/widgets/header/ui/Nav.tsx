import { Home, BookOpen, Info, User2, Hotel } from "lucide-react"

export const navigationItems = [
  {
    title: "На главную",
    href: "/",
    icon: <Home className="h-5 w-5 mr-2" />,
  },
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
    title: "Блог",
    href: "/blog",
    icon: <BookOpen className="h-5 w-5 mr-2" />,
  },
  {
    title: "Города",
    href: "/cities",
    icon: <Hotel className="h-5 w-5 mr-2" />,
  },
  // { title: "Блог", href: "/blog", icon: <BookOpen className="h-5 w-5 mr-2" /> },
  // {
  //   title: "Контакт",
  //   href: "/contact",
  //   icon: <Phone className="h-5 w-5 mr-2" />,
  // },
]

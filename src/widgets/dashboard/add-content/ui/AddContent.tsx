import { Typography } from "@shared/ui/typography"
import Link from "next/link"

export const AddContent = () => {
  const items = [
    {
      id: 1,
      title: "Добавить ресторан",
      path: "/add/restaurant",
    },
  ]
  return (
    <>
      <Typography level="h2">Кнопки</Typography>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="border rounded-lg p-4 hover:bg-secondary"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  )
}

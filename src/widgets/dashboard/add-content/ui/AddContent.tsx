import { Button } from "@shared/ui/button"
import { Typography } from "@shared/ui/typography"
import { MapPin } from "lucide-react"
import Link from "next/link"

export const AddContent = ({ name }: { name: string }) => {
  const items = [
    {
      id: 1,
      title: "Добавить место",
      path: "/add/spot",
      icon: MapPin,
    },
  ]
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <Button asChild key={item.id}>
            <Link href={item.path}>
              <item.icon />
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

import { RestaurantTeaser, TRestaurantTeaser } from "@/entities/node/restaurant"
import Link from "next/link"

export const ViewsCityRestaurant = ({
  items,
}: {
  items: TRestaurantTeaser[]
}) => {
  return (
    <>
      {items.map((item) => (
        <RestaurantTeaser key={item.drupal_internal__nid} item={item} />
      ))}
    </>
  )
}

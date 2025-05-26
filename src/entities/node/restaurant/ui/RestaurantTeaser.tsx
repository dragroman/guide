import Link from "next/link"
import { TRestaurantTeaser } from "../model/types"

export const RestaurantTeaser = ({ item }: { item: TRestaurantTeaser }) => {
  return (
    <Link href={`/restaurant/${item.drupal_internal__nid}`}>{item.title}</Link>
  )
}

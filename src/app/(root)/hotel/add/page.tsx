import { HotelAdd } from "@/entities/node/hotel"
import { drupal } from "@shared/lib/drupal"

export default async function ArticleAdd() {
  return (
    <div className="mt-20">
      <HotelAdd />
    </div>
  )
}

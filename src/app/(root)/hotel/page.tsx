import { authOptions } from "@features/auth"
import { drupal } from "@/shared/lib/drupal"
import { getServerSession } from "next-auth"

export default async function HotelPage() {
  const session = await getServerSession(authOptions)

  const hotels = await drupal.getResourceCollection("node--hotel", {
    withAuth: `Bearer ${session?.accessToken}`,
  })

  return (
    <div>
      <h1 className="mt-20">Hotel Page test auth options</h1>
      {hotels.map((item, index) => (
        <div key={index}>
          {index}. {item.title}
        </div>
      ))}
    </div>
  )
}

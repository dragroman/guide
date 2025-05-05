import Link from "next/link"

export type MapPoint = {
  title: string
  url: string
}

export type MapPointCategory = {
  name: string
  points: MapPoint[]
}

export type MapPoints = MapPointCategory[]

export default function TourMapPoints({
  mapPointsData,
}: {
  mapPointsData: MapPoints
}) {
  const data = mapPointsData
  return (
    <div className="space-y-8">
      {data.map((cat) => (
        <div key={cat.name}>
          <div className="font-bold mb-4">{cat.name}</div>
          <ul className="grid grid-cols-2 gap-2">
            {cat.points.map((point) => (
              <li key={point.title} className="">
                <Link
                  href={point.url}
                  target="_blank"
                  className="block p-2 border rounded shadow-sm hover:shadow-none hover:font-bold"
                >
                  {point.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

import Link from "next/link"
import { TCityTeaser } from "../model/types"
import Image from "next/image"
import { absoluteUrl } from "@shared/lib/utils"

export const CityTeaser = async ({ term }: { term: TCityTeaser }) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-opacity-50 bg-gradient-to-t from-black/60"></div>
      <Image
        src={absoluteUrl(term.field_image.uri.url)}
        alt={term.name}
        width={600}
        height={300}
        className="object-cover"
      />
      <Link
        href={`/city/${term.machine_name}`}
        className="absolute bottom-0 right-0 p-4 text-white text-2xl font-bold"
      >
        {term.name}
      </Link>
    </div>
  )
}

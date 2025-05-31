import Link from "next/link"
import { TCityTeaser } from "../model/types"

export const CityTeaser = async ({ term }: { term: TCityTeaser }) => {
  return <Link href={`/city/${term.machine_name}`}>{term.name}</Link>
}

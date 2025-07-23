import { AddSpot } from "@features/add-node/ui/AddSpot"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Добавить место",
  description: "",
}
export default async function AddSpotPage() {
  return <AddSpot />
}

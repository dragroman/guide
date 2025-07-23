import { AddSpot } from "@features/add-node/ui/AddSpot"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"

export const metadata: Metadata = {
  title: "Добавить место",
  description: "",
}
export default async function AddSpotPage() {
  return <AddSpot />
}

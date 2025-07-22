import { NodeCreator } from "@features/spot"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "AddSpot",
  description: "",
}
export default async function AddSpot() {
  return <NodeCreator />
}

import { ReactNode } from "react"
import { TTourFull } from "../model/types"

export const TourFull = ({
  node,
  actions,
}: {
  node: TTourFull
  actions?: ReactNode
}) => {
  return <h1>{node.title}</h1>
}

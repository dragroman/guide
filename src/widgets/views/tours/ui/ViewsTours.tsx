import { TourTeaser, TTourTeaser } from "@entities/node/tour"

export const ViewsTours = ({ nodes }: { nodes: TTourTeaser[] }) => {
  return nodes.map((node) => <TourTeaser key={node.id} node={node} />)
}

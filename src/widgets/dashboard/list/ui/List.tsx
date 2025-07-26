import {
  ApplicationTeaser,
  TApplicationTeaser,
} from "@entities/node/application"

export const DashboardList = ({ nodes }: { nodes: TApplicationTeaser[] }) => {
  return (
    <>
      <div className="space-y-4">
        {nodes.map((node) => (
          <ApplicationTeaser key={node.id} node={node} />
        ))}
      </div>
    </>
  )
}

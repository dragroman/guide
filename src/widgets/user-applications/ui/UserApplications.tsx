import {
  ApplicationTeaser,
  TApplicationTeaser,
} from "@entities/node/application"
import { DeleteNode } from "@features/delete-node"
import { Alert } from "@shared/ui/alert"
import { Button } from "@shared/ui/button"
import { Typography } from "@shared/ui/typography"
import { Edit2Icon } from "lucide-react"
import Link from "next/link"

export const UserApplications = ({
  nodes,
  accessToken,
}: {
  nodes: TApplicationTeaser[]
  accessToken: string
}) => {
  return (
    <div className="space-y-4">
      <Typography level="h2">Шаг 1</Typography>
      {nodes.length > 0 ? (
        nodes.map((node) => (
          <ApplicationTeaser
            actions={
              <DeleteNode
                nodeId={node.id}
                nodeType={node.type}
                accessToken={accessToken}
              />
            }
            node={node}
            key={node.id}
          />
        ))
      ) : (
        <Alert className="text-center">
          Вы еще не заполнили ни одной анкеты{" "}
          <div className="mt-2">
            <Button asChild variant={"outline"}>
              <Link href="/application">
                <Edit2Icon />
                Заполнить
              </Link>
            </Button>
          </div>
        </Alert>
      )}
    </div>
  )
}

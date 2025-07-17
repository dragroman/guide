import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import { TApplicationTeaser } from "../model/types"
import { ReactNode } from "react"
import { Button } from "@shared/ui/button"
import Link from "next/link"

export const ApplicationTeaser = ({
  node,
  actions,
}: {
  node: TApplicationTeaser
  actions: ReactNode
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{node.title}</CardTitle>
        <CardDescription>{node.drupal_internal__nid}</CardDescription>
      </CardHeader>
      <CardContent>
        С{" "}
        {new Date(node.field_date_from).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        -
        {new Date(node.field_date_to).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/application/${node.drupal_internal__nid}`}>
            Подробнее
          </Link>
        </Button>
        {actions}
      </CardFooter>
    </Card>
  )
}

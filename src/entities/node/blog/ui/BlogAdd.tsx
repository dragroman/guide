import { drupal } from "@/shared/lib/drupal"
import { Form } from "react-hook-form"

export const BlogAdd = async () => {
  const article = await drupal.createResource("node--article", {
    data: {
      attributes: {
        title: "Title of Article",
        body: {
          value: "<p>Content of body field</p>",
          format: "full_html",
        },
      },
    },
  })
  return <Form {...form}></Form>
}

import { TCityTeaser } from "@entities/term/city"
import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { ViewsCities } from "@widgets/views/cities"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export default async function CitiesPage() {
  const params = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFields("taxonomy_term--location", [
      "name",
      "field_image",
      "machine_name",
    ])
    .addInclude(["field_image"])

  const terms = await drupal.getView<TCityTeaser[]>("cities--page_1", {
    params: params.getQueryObject(),
    next: {
      revalidate: 3600,
      tags: ["cities"],
    },
  })

  return (
    <div>
      <PageTitle title="Города" />
      <ViewsCities terms={terms.results} />
    </div>
  )
}

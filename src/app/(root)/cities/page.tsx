import { TCityTeaser } from "@entities/term/city"
import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { ViewsCities } from "@widgets/views/cities"

export default async function CitiesPage() {
  const { results } = await drupal.getView<TCityTeaser[]>("cities--page_1")

  return (
    <div>
      <PageTitle title="Города" />
      <ViewsCities cities={results} />
    </div>
  )
}

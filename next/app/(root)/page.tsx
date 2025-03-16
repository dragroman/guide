import { ArticleTeaser } from "@/components/drupal/ArticleTeaser"
import { drupal } from "@/lib/drupal"
import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"

export const metadata: Metadata = {
  description: "A Next.js site powered by a Drupal backend.",
}

export default async function Home() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article",
    {
      params: {
        "filter[status]": 1,
        "fields[node--article]": "title,path,field_image,uid,created",
        include: "field_image,uid",
        sort: "-created",
      },
      next: {
        revalidate: 3600,
      },
    }
  )

  return (
    <>
      <h1 className="mb-10 text-6xl font-black uppercase">Привет!</h1>
      <div className="text-xl space-y-4 mb-20">
        <p>
          Перед Вами путеводитель по городу, который стал моим вторым домом.
        </p>
        <p>
          Меня зовут Ирина, и последние 10 лет я провела в Харбине -
          удивительном городе на северо-востоке Китая.
        </p>
        <p>
          На страницах этого гида я поделюсь с вами своими любимыми местами и
          проверенными рекомендациями, которые сделают ваше путешествие
          по-настоящему особенным.
        </p>
      </div>
      <h2 className="mb-10 text-6xl font-black">Блог</h2>
      {nodes?.length ? (
        nodes.map((node) => (
          <div key={node.id}>
            <ArticleTeaser node={node} />
            <hr className="my-20" />
          </div>
        ))
      ) : (
        <p className="py-4">No nodes found</p>
      )}
    </>
  )
}

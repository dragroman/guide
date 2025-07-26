"use client"

import _ from "lodash"
import { SpotTeaser, TSpotDefaultTeaser } from "@entities/node/spot"
import { Typography } from "@shared/ui/typography"
import { FavoriteButton } from "@features/favorites/ui/FavoriteButton"

export const ViewsSpotDefault = ({
  nodes,
  userFlags = [],
  categoryOrder = [],
}: {
  nodes: TSpotDefaultTeaser[]
  userFlags?: string[]
  categoryOrder?: string[]
}) => {
  const groupedNodes = _.groupBy(nodes, "field_category.name")

  const categoriesToShow =
    categoryOrder.length > 0 ? categoryOrder : Object.keys(groupedNodes)

  return (
    <>
      {categoriesToShow.map((categoryName) => {
        const categoryNodes = groupedNodes[categoryName]
        if (!categoryNodes?.length) return null

        return (
          <div key={categoryName} className="mb-8">
            <Typography level="h3" className="mb-4">
              {categoryName}
            </Typography>
            <div className="grid grid-cols-3 gap-2">
              {categoryNodes.map((node) => (
                <SpotTeaser
                  key={node.drupal_internal__nid}
                  node={node}
                  favorite={
                    <FavoriteButton
                      entityId={node.drupal_internal__nid.toString()}
                      flagId="favorite"
                      initialFlagged={userFlags.includes(
                        node.drupal_internal__nid.toString()
                      )}
                    />
                  }
                />
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

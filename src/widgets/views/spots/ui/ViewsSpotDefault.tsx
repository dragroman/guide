"use client"

import _ from "lodash"
import { SpotTeaser, TSpotDefaultTeaser } from "@entities/node/spot"
import { Typography } from "@shared/ui/typography"
import { FavoriteButton } from "@features/favorites/ui/FavoriteButton"
import { TParagraphSpotDetails } from "@entities/paragraph"

type TSpotDataItem = TSpotDefaultTeaser | TParagraphSpotDetails

export const ViewsSpotDefault = ({
  nodes,
  userFlags = [],
  categoryOrder = [],
  showParagraphData = false,
}: {
  nodes: TSpotDataItem[]
  userFlags?: string[]
  categoryOrder?: string[]
  showParagraphData?: boolean
}) => {
  // Обрабатываем данные: извлекаем spot nodes и дополнительные данные
  const processedData = nodes.map((item, index) => {
    // Определяем тип данных и извлекаем spot node
    if (item.type === "paragraph--tour_spot_details") {
      const paragraphItem = item as TParagraphSpotDetails
      return {
        spotNode: paragraphItem.field_spot,
        extraData: {
          instructions: paragraphItem.field_instructions?.processed,
          additionalNotes: paragraphItem.field_additional_notes?.processed,
          paragraphId: paragraphItem.drupal_internal__id,
        },
        originalIndex: index,
      }
    } else {
      // Обычный spot node
      return {
        spotNode: item as TSpotDefaultTeaser,
        extraData: null,
        originalIndex: index,
      }
    }
  })

  // Группируем по категориям
  const groupedNodes = _.groupBy(
    processedData,
    (item) => item.spotNode.field_category?.name || "Без категории"
  )

  const categoriesToShow =
    categoryOrder.length > 0 ? categoryOrder : Object.keys(groupedNodes)

  return (
    <>
      {categoriesToShow.map((categoryName) => {
        const categoryItems = groupedNodes[categoryName]
        if (!categoryItems?.length) return null

        return (
          <div key={categoryName} className="mb-8">
            <Typography level="h3" className="mb-4">
              {categoryName}
            </Typography>
            <div className="grid grid-cols-3 gap-2">
              {categoryItems.map((item) => {
                const spotNode = item.spotNode
                const extraData = item.extraData

                return (
                  <div
                    key={`${spotNode.drupal_internal__nid}-${item.originalIndex}`}
                  >
                    <SpotTeaser
                      node={spotNode}
                      favorite={
                        <FavoriteButton
                          entityId={spotNode.drupal_internal__nid.toString()}
                          flagId="favorite"
                          initialFlagged={userFlags.includes(
                            spotNode.drupal_internal__nid.toString()
                          )}
                        />
                      }
                    />

                    {/* Показываем дополнительные данные из параграфа только если включен флаг */}
                    {showParagraphData && extraData && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                        {extraData.instructions && (
                          <div className="mb-2">
                            <strong className="text-gray-700">
                              Инструкции:
                            </strong>
                            <div
                              className="mt-1 text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: extraData.instructions,
                              }}
                            />
                          </div>
                        )}
                        {extraData.additionalNotes && (
                          <div>
                            <strong className="text-gray-700">
                              Дополнительные заметки:
                            </strong>
                            <div
                              className="mt-1 text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: extraData.additionalNotes,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

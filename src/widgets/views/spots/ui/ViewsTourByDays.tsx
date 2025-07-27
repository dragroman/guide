import { TParagraphTourDay } from "@entities/paragraph"
import { Typography } from "@shared/ui/typography"
import { ViewsSpotDefault } from "./ViewsSpotDefault"

export const ViewsTourByDays = ({
  days,
  userFlags,
  showParagraphData = true,
}: {
  days: TParagraphTourDay[]
  userFlags?: string[]
  showParagraphData?: boolean
}) => {
  return (
    <>
      {days.map((day, index) => (
        <div key={day.drupal_internal__id} className="mb-12">
          <Typography level="h2" className="mb-4">
            День {index + 1}: {day.field_day_title}
          </Typography>

          {day.field_day_description && (
            <div
              className="mb-6 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: day.field_day_description.processed,
              }}
            />
          )}

          <ViewsSpotDefault
            nodes={day.field_day_spots}
            userFlags={userFlags}
            showParagraphData={showParagraphData}
          />
        </div>
      ))}
    </>
  )
}

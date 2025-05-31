import Link from "next/link"
import { TRestaurantFull } from "../model/types"
import { Paragraph, ParagraphRenderer } from "@entities/paragraph"
import { PageTitle } from "@shared/ui/page-title"

export const RestaurantFull = ({ item }: { item: TRestaurantFull }) => {
  return (
    <div>
      <PageTitle title={item.title}></PageTitle>
      <div className="mb-4 text-gray-600">
        Category: {item.field_category.name}
      </div>
      <div className="mb-4 text-gray-600">
        Location: {item.field_location.name}
      </div>
      {item.field_address_cn && (
        <div className="mb-2">地址: {item.field_address_cn}</div>
      )}
      {item.field_name_cn && (
        <div className="mb-2">中文名: {item.field_name_cn}</div>
      )}
      {item.field_phone && (
        <div className="mb-2">Phone: {item.field_phone}</div>
      )}
    </div>
  )
}

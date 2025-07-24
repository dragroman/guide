import { TApplicationFull } from "../model/types"
import { SectionPersonal } from "./sections/SectionPersonal"
import { SectionDates } from "./sections/SectionDates"
import { SectionAccommodation } from "./sections/SectionAccommodation"
import { SectionTransport } from "./sections/SectionTransport"
import { SectionFood } from "./sections/SectionFood"
import { SectionShopping } from "./sections/SectionShopping"
import { SectionBudget } from "./sections/SectionBudget"
import { SectionContact } from "./sections/SectionContact"
import { Card } from "@shared/ui/card"
import { ReactNode } from "react"

export const ApplicationFull = ({
  node,
  actions,
}: {
  node: TApplicationFull
  actions?: ReactNode
}) => {
  return (
    <>
      <div className="grid gap-6">
        <SectionPersonal node={node} />
        <SectionDates node={node} />
        <SectionAccommodation node={node} />
        <SectionTransport node={node} />
        <SectionFood node={node} />
        <SectionShopping node={node} />
        <SectionBudget node={node} />
        <SectionContact node={node} />
        {actions}
      </div>
    </>
  )
}

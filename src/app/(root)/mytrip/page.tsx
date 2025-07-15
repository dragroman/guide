import { PageTitle } from "@shared/ui/page-title"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "MyTripPage",
  description: "",
}
export default async function MyTripPage() {
  return (
    <>
      <PageTitle title="Мое путешествие" />
      <h2 className="text-bold">Моя анкета</h2>
    </>
  )
}

import { CityTeaser, TCityTeaser } from "@entities/term/city"

export const ViewsCities = ({ terms }: { terms: TCityTeaser[] }) => {
  return (
    <>
      {terms.map((term) => (
        <CityTeaser key={term.id} term={term} />
      ))}
    </>
  )
}

import { CityTeaser, TCityTeaser } from "@entities/term/city"

export const ViewsCities = ({ cities }: { cities: TCityTeaser[] }) => {
  return (
    <>
      {cities.map((item) => (
        <CityTeaser key={item.machine_name} term={item} />
      ))}
    </>
  )
}

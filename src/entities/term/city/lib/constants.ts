import { TCityFull } from "../model/types"

export const getCityLabels = (city: TCityFull) => [
  { label: "1-комн. центр", value: city.field_apt_1bed_center },
  { label: "1-комн. вне центра", value: city.field_apt_1bed_outside },
  { label: "3-комн. центр", value: city.field_apt_3bed_center },
  { label: "3-комн. вне центра", value: city.field_apt_3bed_outside },
  { label: "Средняя зарплата", value: city.field_avg_monthly_salary },
  { label: "Сигареты", value: city.field_cigarettes },
  { label: "Бензин 1л", value: city.field_gas_1l },
  { label: "Обед (дёшево)", value: city.field_meal_cheap },
  { label: "Обед (средний)", value: city.field_meal_mid },
]

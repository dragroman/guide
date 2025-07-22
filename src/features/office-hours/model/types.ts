import { Control } from "react-hook-form"

export interface WorkingHoursEntry {
  day: number
  all_day?: boolean
  starthours?: number
  endhours?: number
  comment?: string
}

export interface MobileWorkingHoursFieldProps {
  control: Control<any>
  name: string
  label?: string
  description?: string
  className?: string
}

export interface WorkingHoursFieldProps {
  control: Control<any>
  name: string
  label?: string
  description?: string
  className?: string
}

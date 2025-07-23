import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@shared/ui/drawer"
import { ResponsiveWorkingHoursField } from "@features/office-hours/ui/ResponsiveWorkingHoursField"
import { UseFormReturn } from "react-hook-form"
import { Button } from "@shared/ui/button"
import { Check, Clock } from "lucide-react"

export const FieldWorkingHours = ({ form }: { form: UseFormReturn<any> }) => {
  const workingHours = form.watch("workingHours")
  const hasWorkingHours = workingHours && workingHours.length > 0
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={hasWorkingHours ? "default" : `outline`}>
            <Clock />
            Часы работы
          </Button>
        </DrawerTrigger>
        {hasWorkingHours ? (
          <span className="ml-2 text-xs">Часы работы установлены</span>
        ) : (
          <span className="ml-2 text-xs">Не установлено</span>
        )}
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg max-h-[600px] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle>Настроить часы работы</DrawerTitle>
            </DrawerHeader>
            <div className="px-5">
              <ResponsiveWorkingHoursField
                control={form.control}
                name="workingHours"
                label="Часы работы"
              />
            </div>
          </div>
          <DrawerFooter className="mx-auto w-full max-w-lg">
            <DrawerClose asChild>
              <Button className="w-full">Сохранить</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="text-[0.8rem] text-muted-foreground">
        Укажите часы работы места. Можете использовать предустановки или
        настроить вручную. Оставьте поле пустым, тогда поле не отобразится
      </div>
    </>
  )
}

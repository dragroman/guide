// components/ConditionalFields.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@shared/ui/form"
import { Checkbox } from "@shared/ui/checkbox"
import { Control } from "react-hook-form"
import {
  ATTRACTION_OPTIONS,
  CATEGORY_IDS,
  CUISINE_OPTIONS,
  HOTEL_STARS_OPTIONS,
} from "../model/constants"
import { Input } from "@shared/ui/input"

interface ConditionalFieldsProps {
  control: Control<any>
  categoryId: string
}

export function ConditionalFields({
  control,
  categoryId,
}: ConditionalFieldsProps) {
  // Поля для ресторанов
  if (CATEGORY_IDS.RESTAURANT.includes(categoryId)) {
    return (
      <div className="space-y-4 border-t pt-4">
        <h3 className="font-medium text-sm text-muted-foreground">
          Дополнительные поля
        </h3>

        <FormField
          control={control}
          name="cuisineTypes"
          render={() => (
            <FormItem>
              <FormLabel>Типы кухни</FormLabel>
              <FormDescription>
                Выберите все подходящие типы кухни
              </FormDescription>
              <div className="grid grid-cols-2 gap-3">
                {CUISINE_OPTIONS.map((option) => (
                  <FormField
                    key={option.value}
                    control={control}
                    name="cuisineTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.value)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), option.value]
                                  : field.value?.filter(
                                      (value: string) => value !== option.value
                                    )
                                field.onChange(updatedValue)
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="averagePrices"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Средний чек</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="140" type="number" {...field} />
                  <span className="absolute right-6 top-0 bottom-0 flex items-center pr-4 text-xl text-muted-foreground">
                    {"¥"}
                  </span>
                </div>
              </FormControl>
              <FormDescription>Введите средний чек в заведении</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )
  }

  // Поля для отелей
  if (CATEGORY_IDS.HOTEL.includes(categoryId)) {
    return (
      <div className="space-y-4 border-t pt-4">
        <h3 className="font-medium text-sm text-muted-foreground">
          Дополнительные поля
        </h3>

        <FormField
          control={control}
          name="hotelStars"
          render={() => (
            <FormItem>
              <FormLabel>Звездность</FormLabel>
              <div className="flex gap-3">
                {HOTEL_STARS_OPTIONS.map((option) => (
                  <FormField
                    key={option.value}
                    control={control}
                    name="hotelStars"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.value)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), option.value]
                                  : field.value?.filter(
                                      (value: string) => value !== option.value
                                    )
                                field.onChange(updatedValue)
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )
  }

  // Поля для достопримечательностей
  if (CATEGORY_IDS.ATTRACTION.includes(categoryId)) {
    return (
      <div className="space-y-4 border-t pt-4">
        <h3 className="font-medium text-sm text-muted-foreground">
          Дополнительные поля
        </h3>

        <FormField
          control={control}
          name="ticketPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Стоимость входа</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="100" type="number" {...field} />
                  <span className="absolute right-6 top-0 bottom-0 flex items-center pr-4 text-xl text-muted-foreground">
                    {"¥"}
                  </span>
                </div>
              </FormControl>
              <FormDescription>
                Ввеите стоимость входного билета
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    )
  }

  return null
}

import { Label } from "@shared/ui/label"
import { Button } from "@shared/ui/button"
import { PlusCircle, X } from "lucide-react"
import { CitySelect } from "./CitySelect"
import { CityDescription } from "./CityDescription"
import type { City } from "../../model/types"
import { useLocationSelector } from "../../model/useCitySelector"

interface CitySelectMultiProps {
  label: string
  value: string | string[]
  placeholder?: string
  onChange: (value: string, internalId?: number, cities?: City[]) => void
  error?: string
  className?: string
}

export function CitySelectMulti({
  label,
  value,
  placeholder = "Выберите город...",
  onChange,
  error,
  className,
}: CitySelectMultiProps) {
  const { cities, handleCityChange, handleAddCity, handleRemoveCity } =
    useLocationSelector({ value, onChange })

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor="city">{label}</Label>
        {cities.length > 0 && cities.some((city) => city.id) && (
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={handleAddCity}
          >
            <PlusCircle className="h-4 w-4" />
            Добавить город
          </Button>
        )}
      </div>

      {cities.map((city, index) => (
        <div key={index} className="relative mb-4">
          <div className="flex gap-2 items-center">
            <div className="flex-grow">
              <CitySelect
                value={city.id}
                onChange={(id, internalId, name) =>
                  handleCityChange(index, id, internalId, name)
                }
                placeholder={placeholder}
                error={error}
              />
            </div>
            {cities.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => handleRemoveCity(index)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}

      {/* Отображение описаний городов */}
      {cities.length > 1 ? (
        <div className="grid grid-cols-2 gap-2">
          {cities.map((city, index) => (
            <CityDescription key={index} cityId={city.id} compact={true} />
          ))}
        </div>
      ) : (
        cities.map((city, index) => (
          <CityDescription key={index} cityId={city.id} compact={false} />
        ))
      )}

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  )
}

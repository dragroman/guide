// components/tours/TourPricePackage.tsx
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"
import { ButtonProps } from "@/components/ui/button"

interface TourPricePackageProps {
  title: string
  description: string
  price: number
  features: string[]
  buttonText?: string
  buttonVariant?: ButtonProps["variant"]
}

export const TourPricePackage = ({
  title,
  description,
  price,
  features,
  buttonText = "Выбрать пакет",
  buttonVariant = "default",
}: TourPricePackageProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold">
          от ${price.toFixed(0)}
          <span className="text-lg font-normal text-muted-foreground">
            {" "}
            за семью
          </span>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={buttonVariant}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

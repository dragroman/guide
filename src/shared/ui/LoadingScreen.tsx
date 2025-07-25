import { Loader2 } from "lucide-react"

export function LoadingScreen({
  title = "Загрузка",
  description = "По полям, по полям, синий трактор едет к нам",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50">
      <div className="text-center max-w-md px-4">
        <div className="relative inline-block mb-6">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold animate-pulse">{title}</h2>
          <p className="text-muted-foreground animate-pulse delay-150">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

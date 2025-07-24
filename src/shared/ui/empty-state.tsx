import { Button } from "@shared/ui/button"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string | ReactNode
  actionHref?: string
  onAction?: () => void
  children?: ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6">
        <Icon className="h-16 w-16 text-muted-foreground mx-auto" />
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>

      {children || (actionLabel && (actionHref || onAction)) ? (
        <div className="w-full max-w-xs space-y-3">
          {children}

          {actionLabel && actionHref && (
            <Button asChild className="w-full">
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          )}

          {actionLabel && onAction && (
            <Button onClick={onAction} className="w-full">
              {actionLabel}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  )
}

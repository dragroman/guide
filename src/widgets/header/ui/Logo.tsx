import { cn } from "@shared/lib/utils"
import Link from "next/link"

export const Logo = ({
  isScrolled,
  shouldBeTransparent,
}: {
  isScrolled: boolean
  shouldBeTransparent: boolean
}) => {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-bold no-underline md:flex-1",
        isScrolled || !shouldBeTransparent ? "text-foreground" : "text-white"
      )}
    >
      chinq<span className="text-primary">.</span>
    </Link>
  )
}

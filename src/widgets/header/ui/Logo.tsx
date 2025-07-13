import { cn } from "@shared/lib/utils"
import Link from "next/link"
import Image from "next/image"

export const Logo = ({
  isScrolled,
  shouldBeTransparent,
}: {
  isScrolled: boolean
  shouldBeTransparent: boolean
}) => {
  return (
    <Link href="/">
      <Image
        src="/logo/logo.svg"
        width={30}
        height={30}
        alt="Индивидуальные туры в Китай"
      />
    </Link>
  )
}

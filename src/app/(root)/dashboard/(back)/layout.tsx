import { BackButton } from "@shared/ui/back-button"
import { ArrowLeft } from "lucide-react"
import { ReactNode, Suspense } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Suspense>
        <div className="-mt-12 mb-4">
          <BackButton>
            <ArrowLeft />
            Вернуться
          </BackButton>
        </div>
      </Suspense>
      <main>{children}</main>
    </div>
  )
}

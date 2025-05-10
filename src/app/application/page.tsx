// next/src/app/application/start/page.tsx
import { LoadingScreen } from "@/components/shared/LoadingScreen"
import { Suspense, lazy } from "react"

// Ленивая загрузка компонента
const Application = lazy(() => import("@/components/application"))

export default function ApplicationStartPage() {
  return (
    <Suspense
      fallback={
        <>
          <LoadingScreen />
        </>
      }
    >
      <div className="max-w-[500px] mx-auto">
        <Application />
      </div>
    </Suspense>
  )
}

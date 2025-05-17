// next/src/app/application/start/page.tsx
import { LoadingScreen } from "@shared/ui/LoadingScreen"
import { Suspense, lazy } from "react"

// Ленивая загрузка компонента
const Application = lazy(() => import("@processes/application"))

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

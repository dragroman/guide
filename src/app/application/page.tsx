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
          <LoadingScreen
            title="Секунду..."
            description="Подбираем лучшие впечатления для вашего путешествия"
          />
        </>
      }
    >
      <div className="max-w-[500px] mx-auto">
        <Application />
      </div>
    </Suspense>
  )
}

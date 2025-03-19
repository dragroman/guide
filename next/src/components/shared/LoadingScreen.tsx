export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-4 border-pink-500 rounded-full animate-spin"></div>
        </div>
        <div className="mt-6 space-y-2">
          <h2 className="text-3xl font-bold text-gray-800 animate-pulse">
            Собираем маршрут
          </h2>
          <p className="text-gray-500 animate-pulse delay-150">
            Подбираем лучшие впечатления для вашего путешествия
          </p>
        </div>
      </div>
    </div>
  )
}

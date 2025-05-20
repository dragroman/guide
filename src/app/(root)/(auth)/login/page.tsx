import { LoginForm } from "@features/login"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-6">Вход в систему</h1>
      <LoginForm />
    </div>
  )
}

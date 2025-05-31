import { SignInForm } from "@features/auth/sign-in"
import { Button } from "@shared/ui/button"
import Link from "next/link"

export default function SignInPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Вход в систему</h1>
      <SignInForm />
      <div className="mt-4 text-center">
        <Button variant="link" className="text-muted-foreground" asChild>
          <Link href="/signup">Создать аккаунт</Link>
        </Button>
      </div>
    </>
  )
}

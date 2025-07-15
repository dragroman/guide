import { SignInForm } from "@features/auth/sign-in"
import { Button } from "@shared/ui/button"
import { PageTitle } from "@shared/ui/page-title"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export const SignIn = async () => {
  const t = await getTranslations("signIn")
  return (
    <>
      <SignInForm />
      <div className="flex flex-col mt-4 gap-2 items-center">
        <div>
          <Button asChild variant="link">
            <Link href="/signup">{t("createAccount")}</Link>
          </Button>
        </div>
        <div>
          <Button asChild variant="link">
            <Link href="/forgot-password">Забыли пароль?</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

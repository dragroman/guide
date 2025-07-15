import { PageTitle } from "@shared/ui/page-title"
import { SignIn } from "@widgets/auth/sign-in"
import { getTranslations } from "next-intl/server"

export default async function SignInPage() {
  const t = await getTranslations("signIn")
  return (
    <>
      <PageTitle title={t("title")} />
      <SignIn />
    </>
  )
}

import { PageTitle } from "@shared/ui/page-title"
import { SignUp } from "@widgets/auth/sign-up"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в систему",
}

export default async function SignUpPage() {
  const t = await getTranslations("signUp")
  return (
    <>
      <PageTitle title={t("title")} />
      <SignUp />
    </>
  )
}

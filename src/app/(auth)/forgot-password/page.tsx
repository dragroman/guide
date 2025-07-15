import { PageTitle } from "@shared/ui/page-title"
import { ForgotPassword } from "@widgets/auth/forgot-password"
import { getTranslations } from "next-intl/server"

export default async function ForgotPasswordPage() {
  const t = await getTranslations("forgotPassword")
  return (
    <>
      <PageTitle title={t("title")} />
      <ForgotPassword />
    </>
  )
}

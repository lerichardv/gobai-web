import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata = {
  title: "Restablecer Contraseña | Gobai",
  description: "Crea una nueva contraseña para tu cuenta de Gobai",
}

interface PageProps {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const params = await searchParams
  const token = params.token || null

  return <ResetPasswordForm token={token} />
}

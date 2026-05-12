import { redirect } from "next/navigation"

export const metadata = {
  title: "Register | Gobai",
  description: "Create a new Gobai account",
}

export default function RegisterPage() {
  redirect("/auth/login")
}

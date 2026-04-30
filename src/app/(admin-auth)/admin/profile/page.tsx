import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getUserProfile } from "@/app/actions/user"
import { ProfileForm } from "@/components/admin/profile/profile-form"
import { PasswordForm } from "@/components/admin/profile/password-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Mi Perfil | Administración",
  description: "Configura tu perfil y preferencias de autor",
}

export default async function AdminProfilePage() {
  const user = await getUserProfile()

  if (!user) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href="/admin/dashboard" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-gobai-cyan transition-colors mb-4 text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Panel
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Mi Perfil</h1>
          <p className="text-white/40">Gestiona tu identidad y seguridad en el sistema.</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 h-12 mb-8">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-gobai-cyan data-[state=active]:text-white text-white/60 px-8 h-10"
          >
            <User className="h-4 w-4 mr-2" />
            Perfil y Autor
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-gobai-cyan data-[state=active]:text-white text-white/60 px-8 h-10"
          >
            <Shield className="h-4 w-4 mr-2" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 focus-visible:outline-none">
          <ProfileForm user={user} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6 focus-visible:outline-none">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

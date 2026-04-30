import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/sidebar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#00040a]">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-4 sticky top-0 z-20 bg-[#00040a]/80 backdrop-blur-md">
            <SidebarTrigger className="text-white hover:bg-white/5" />
            <div className="h-4 w-px bg-white/10 mx-2" />
            <h2 className="text-sm font-semibold text-white/60">Panel de Administración</h2>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

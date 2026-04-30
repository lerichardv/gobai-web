import { getAllUsers } from "@/app/actions/user-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserFormDialog } from "@/components/admin/users/user-form-dialog"
import { DeleteUserButton } from "@/components/admin/users/delete-user-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit2, ShieldCheck, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { TablePagination } from "@/components/admin/table-pagination"

export const metadata = {
  title: "Usuarios | Administración",
  description: "Gestiona los miembros del equipo administrativo",
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1
  const { users, totalPages, total } = await getAllUsers(page)
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Usuarios</h1>
          <p className="text-white/60">Administra los accesos y perfiles del equipo.</p>
        </div>
        <UserFormDialog />
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Equipo Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Usuario</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Email</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Identidad de Autor</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-white/40">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-white/10 shadow-lg">
                            <AvatarImage src={user.image || ""} />
                            <AvatarFallback className="bg-gobai-blue-dark text-white text-xs font-bold uppercase">
                              {user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-white font-bold flex items-center gap-2">
                              {user.name || "Sin nombre"}
                              {session?.user?.email === user.email && (
                                <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-md bg-gobai-cyan/10 text-gobai-cyan text-[10px] font-black uppercase tracking-tighter">
                                  <ShieldCheck className="h-3 w-3" /> Tú
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-white/20" />
                          {user.email}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-1">
                            {user.authorVisibility.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-white/60 flex items-center gap-1.5 font-medium">
                            <User className="h-3 w-3 text-gobai-cyan" />
                            {user.customAuthor || "No configurado"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <UserFormDialog 
                            user={user}
                            trigger={
                              <Button variant="ghost" size="icon" className="text-white/60 hover:text-gobai-cyan hover:bg-gobai-cyan/10">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <DeleteUserButton 
                            userId={user.id} 
                            userName={user.name} 
                            userEmail={user.email}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between">
            <p className="text-xs text-white/40">
              Mostrando <span className="text-white font-medium">{users.length}</span> de <span className="text-white font-medium">{total}</span> usuarios
            </p>
            <TablePagination 
              totalPages={totalPages} 
              currentPage={page} 
              baseUrl="/admin/users" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

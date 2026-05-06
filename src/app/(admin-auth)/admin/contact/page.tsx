import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getContactSubmissions } from "@/app/actions/contact"
import { TablePagination } from "@/components/admin/table-pagination"
import { ExportSubmissionsButton } from "@/components/admin/contact/export-button"
import { SubmissionDetailsDialog } from "@/components/admin/contact/details-dialog"
import { RiMailLine } from "@remixicon/react"

export const metadata = {
  title: "Contactos | Administración",
  description: "Gestiona los mensajes recibidos a través del formulario de contacto",
}

export default async function ContactAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1
  
  const { submissions, totalPages, total } = await getContactSubmissions(page, 10)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Contactos</h1>
          <p className="text-white/60">Gestiona los mensajes recibidos a través del sitio web.</p>
        </div>
        <ExportSubmissionsButton />
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <RiMailLine className="h-5 w-5 text-gobai-cyan" />
            Mensajes Recibidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Nombre</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Email</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Teléfono</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Fecha</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-white/40">
                      No hay mensajes de contacto todavía.
                    </td>
                  </tr>
                ) : (
                  submissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4">
                        <span className="text-white font-medium">{submission.name}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-white/60">
                        {submission.email}
                      </td>
                      <td className="py-4 px-4 text-sm text-white/40">
                        {submission.phone || '—'}
                      </td>
                      <td className="py-4 px-4 text-sm text-white/40">
                        {new Date(submission.createdAt).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <SubmissionDetailsDialog submission={submission} />
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
              Mostrando <span className="text-white font-medium">{submissions.length}</span> de <span className="text-white font-medium">{total}</span> mensajes
            </p>
            <TablePagination 
              totalPages={totalPages} 
              currentPage={page} 
              baseUrl="/admin/contact" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Globe, Lock, Copy, ExternalLink, Trophy } from "lucide-react"
import Link from "next/link"
import { getAdminSuccessCases, duplicateSuccessCase } from "@/app/actions/success-cases"
import { DeleteCaseButton } from "@/components/admin/success-cases/delete-case-button"
import { TablePagination } from "@/components/admin/table-pagination"
import { CaseFilters } from "@/components/admin/success-cases/case-filters"

export const metadata = {
  title: "Casos de Éxito | Administración",
  description: "Administra los casos de éxito de tu sitio",
}

export default async function SuccessCasesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined
  const language = typeof resolvedSearchParams.language === 'string' ? resolvedSearchParams.language : undefined
  const status = typeof resolvedSearchParams.status === 'string' ? resolvedSearchParams.status : undefined
  
  const { cases, totalPages, total } = await getAdminSuccessCases(page, 10, search, language, status)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Casos de Éxito</h1>
          <p className="text-white/60">Gestiona los proyectos y casos de éxito de tu sitio.</p>
        </div>
        <Button asChild className="bg-gobai-cyan text-white hover:bg-gobai-cyan-light font-bold">
          <Link href="/admin/success-cases/new">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Caso
          </Link>
        </Button>
      </div>

      <CaseFilters />

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gobai-cyan" />
            Proyectos Registrados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Proyecto</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Idioma</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Estado</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Etiqueta</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Fecha</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/40">
                      No hay casos de éxito creados todavía.
                    </td>
                  </tr>
                ) : (
                  cases.map((item) => (
                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium">{item.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/40">/{item.slug}</span>
                            <Link 
                              href={`/${item.language}/casos-de-exito/${item.slug}`} 
                              target="_blank"
                              className="text-white/20 hover:text-gobai-cyan transition-colors"
                              title="Ver caso público"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gobai-cyan/10 text-gobai-cyan border border-gobai-cyan/20">
                          {item.language === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {item.published ? (
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                            <Globe className="h-3 w-3" />
                            Publicado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-white/10 text-white/40">
                            <Lock className="h-3 w-3" />
                            Borrador
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm text-white/60">
                        {item.tag || '—'}
                      </td>
                      <td className="py-4 px-4 text-sm text-white/40">
                        {item.date || new Date(item.createdAt).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <form action={async () => {
                            "use server"
                            await duplicateSuccessCase(item.id)
                          }}>
                            <Button type="submit" variant="ghost" size="icon" className="text-white/60 hover:text-gobai-cyan hover:bg-gobai-cyan/10">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </form>
                          <Button asChild variant="ghost" size="icon" className="text-white/60 hover:text-gobai-cyan hover:bg-gobai-cyan/10">
                            <Link href={`/admin/success-cases/edit/${item.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeleteCaseButton caseId={item.id} caseTitle={item.title} />
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
              Mostrando <span className="text-white font-medium">{cases.length}</span> de <span className="text-white font-medium">{total}</span> casos
            </p>
            <TablePagination 
              totalPages={totalPages} 
              currentPage={page} 
              baseUrl="/admin/success-cases" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

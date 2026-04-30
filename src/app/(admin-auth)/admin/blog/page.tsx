import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Globe, Lock, Copy, ExternalLink, Link2 } from "lucide-react"
import Link from "next/link"
import { getBlogPosts, duplicateBlogPost } from "@/app/actions/blog"
import { revalidatePath } from "next/cache"
import { DeletePostButton } from "@/components/admin/blog/delete-post-button"
import { TablePagination } from "@/components/admin/table-pagination"
import { CopyLinkButton } from "@/components/admin/blog/copy-link-button"

export const metadata = {
  title: "Blog | Administración",
  description: "Administra los artículos de tu blog",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const { posts, totalPages, total } = await getBlogPosts(page)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Blog</h1>
          <p className="text-white/60">Gestiona los artículos y publicaciones de tu sitio.</p>
        </div>
        <Button asChild className="bg-gobai-cyan text-white hover:bg-gobai-cyan-light font-bold">
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Artículo
          </Link>
        </Button>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Artículos Publicados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Título</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Idioma</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Estado</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Autor</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60">Fecha</th>
                  <th className="py-4 px-4 text-sm font-medium text-white/60 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/40">
                      No hay artículos creados todavía.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium">{post.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/40">/{post.slug}</span>
                            <Link 
                              href={`/${post.language}/blog/${post.slug}`} 
                              target="_blank"
                              className="text-white/20 hover:text-gobai-cyan transition-colors"
                              title="Ver artículo público"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gobai-cyan/10 text-gobai-cyan border border-gobai-cyan/20">
                          {post.language === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {post.published ? (
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
                        {post.author.name || post.author.email}
                      </td>
                      <td className="py-4 px-4 text-sm text-white/40">
                        {new Date(post.createdAt).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <form action={async () => {
                            "use server"
                            await duplicateBlogPost(post.id)
                          }}>
                            <Button type="submit" variant="ghost" size="icon" className="text-white/60 hover:text-gobai-cyan hover:bg-gobai-cyan/10">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </form>
                          <Button asChild variant="ghost" size="icon" className="text-white/60 hover:text-gobai-cyan hover:bg-gobai-cyan/10">
                            <Link href={`/admin/blog/edit/${post.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeletePostButton postId={post.id} postTitle={post.title} />
                          <CopyLinkButton slug={post.slug} language={post.language} />
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
              Mostrando <span className="text-white font-medium">{posts.length}</span> de <span className="text-white font-medium">{total}</span> artículos
            </p>
            <TablePagination 
              totalPages={totalPages} 
              currentPage={page} 
              baseUrl="/admin/blog" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

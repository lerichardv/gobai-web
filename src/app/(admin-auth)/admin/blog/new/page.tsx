"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Globe, Lock } from "lucide-react"
import Link from "next/link"
import { RichTextEditor } from "@/components/admin/blog/rich-text-editor"
import { ImageUploadField } from "@/components/admin/blog/image-upload-field"
import { createBlogPost } from "@/app/actions/blog"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [language, setLanguage] = useState("es")
  const [published, setPublished] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [headingBackgroundImage, setHeadingBackgroundImage] = useState<string | null>(null)
  const [showFeaturedImage, setShowFeaturedImage] = useState(true)

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    setSlug(val.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug || !content) {
      toast.error("Por favor completa todos los campos")
      return
    }

    setIsLoading(true)
    try {
      const result = await createBlogPost({
        title,
        slug,
        content,
        language,
        featuredImage,
        headingBackgroundImage,
        showFeaturedImage,
        published
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Artículo creado exitosamente")
        if (result.post?.id) {
          router.push(`/admin/blog/edit/${result.post.id}`)
        }
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="text-white/60 hover:text-white">
          <Link href="/admin/blog">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Nuevo Artículo</h1>
          <p className="text-white/60">Crea una nueva publicación para tu blog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Contenido del Artículo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/80">Título</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Escribe un título atractivo..."
                  className="bg-white/5 border-white/10 text-white focus:border-gobai-cyan transition-colors text-lg font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80">Cuerpo del Artículo</Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-white/80">Slug (URL)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-white/40 text-sm">/</span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus:border-gobai-cyan transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-white/80">Idioma del Artículo</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('es')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${language === 'es' ? 'bg-gobai-cyan/10 border-gobai-cyan/40 text-gobai-cyan' : 'border-white/5 text-white/40 hover:bg-white/5'}`}
                  >
                    <span className="text-lg">🇪🇸</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Español</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${language === 'en' ? 'bg-gobai-cyan/10 border-gobai-cyan/40 text-gobai-cyan' : 'border-white/5 text-white/40 hover:bg-white/5'}`}
                  >
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-xs font-bold uppercase tracking-widest">English</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-white/80">Estado</Label>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setPublished(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${!published ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-white/40 hover:bg-white/5'}`}
                  >
                    <Lock className="h-4 w-4" />
                    <div className="text-left text-sm">
                      <div className="font-bold">Borrador</div>
                      <div className="text-xs opacity-60">Solo visible para administradores</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPublished(true)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${published ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'border-white/5 text-white/40 hover:bg-white/5'}`}
                  >
                    <Globe className="h-4 w-4" />
                    <div className="text-left text-sm">
                      <div className="font-bold">Público</div>
                      <div className="text-xs opacity-60">Visible para todos los usuarios</div>
                    </div>
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gobai-cyan text-white hover:bg-gobai-cyan-light font-bold h-12"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Artículo"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Multimedia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <ImageUploadField 
                label="Imagen Destacada"
                value={featuredImage}
                onChange={setFeaturedImage}
                description="Se usará en listados y al inicio del artículo."
              />

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-white">Mostrar Imagen Destacada</Label>
                  <p className="text-[10px] text-white/40 italic">¿Mostrar imagen antes del contenido?</p>
                </div>
                <Switch 
                  checked={showFeaturedImage}
                  onCheckedChange={setShowFeaturedImage}
                />
              </div>

              <div className="h-px bg-white/5" />

              <ImageUploadField 
                label="Fondo de Encabezado"
                value={headingBackgroundImage}
                onChange={setHeadingBackgroundImage}
                description="Imagen de fondo para el título del artículo."
              />
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

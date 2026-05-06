"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Globe, Lock, Trophy, MapPin, Calendar, Tag, X } from "lucide-react"
import Link from "next/link"
import { RichTextEditor } from "@/components/admin/blog/rich-text-editor"
import { ImageUploadField } from "@/components/admin/blog/image-upload-field"
import { updateSuccessCase, getSuccessCaseById } from "@/app/actions/success-cases"
import { toast } from "sonner"

export default function EditSuccessCasePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [language, setLanguage] = useState("es")
  const [published, setPublished] = useState(false)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [tag, setTag] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const data = await getSuccessCaseById(id)
        if (data) {
          setTitle(data.title)
          setSlug(data.slug)
          setDescription(data.description)
          setContent(data.content)
          setLanguage(data.language)
          setPublished(data.published)
          setMainImage(data.mainImage)
          setTag(data.tag || "")
          setLocation(data.location || "")
          setDate(data.date || "")
          setImages(data.images)
        } else {
          toast.error("Caso de éxito no encontrado")
          router.push("/admin/success-cases")
        }
      } catch (error) {
        toast.error("Error al cargar los datos")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCase()
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !slug || !description || !content) {
      toast.error("Por favor completa los campos obligatorios")
      return
    }

    setIsSaving(true)
    try {
      const result = await updateSuccessCase(id, {
        title,
        slug,
        description,
        content,
        language,
        published,
        mainImage,
        tag,
        location,
        date,
        images
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Caso de éxito actualizado correctamente")
        router.refresh()
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#00040a]">
        <div className="w-12 h-12 border-t-2 border-b-2 border-gobai-cyan rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="text-white/60 hover:text-white">
          <Link href="/admin/success-cases">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Editar Caso de Éxito</h1>
          <p className="text-white/60">Modifica los detalles del proyecto exitoso.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gobai-cyan" />
                Información del Proyecto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/80">Título del Proyecto *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus:border-gobai-cyan transition-colors text-lg font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white/80">Descripción Corta *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus:border-gobai-cyan transition-colors min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white/80">Detalle del Caso de Éxito *</Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-gobai-turquoise" />
                Galería de Imágenes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <ImageUploadField 
                  label="Añadir Imagen"
                  value={null}
                  onChange={(url) => url && setImages([...images, url])}
                />
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
                <Label className="text-white/80">Idioma</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('es')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${language === 'es' ? 'bg-gobai-cyan/10 border-gobai-cyan/40 text-gobai-cyan' : 'border-white/5 text-white/40 hover:bg-white/5'}`}
                  >
                    <span className="text-lg">🇪🇸</span>
                    <span className="text-xs font-bold uppercase tracking-widest">ES</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${language === 'en' ? 'bg-gobai-cyan/10 border-gobai-cyan/40 text-gobai-cyan' : 'border-white/5 text-white/40 hover:bg-white/5'}`}
                  >
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-xs font-bold uppercase tracking-widest">EN</span>
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
                    <div className="text-left text-sm font-bold">Borrador</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPublished(true)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${published ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'border-white/5 text-white/40 hover:bg-white/5'}`}
                  >
                    <Globe className="h-4 w-4" />
                    <div className="text-left text-sm font-bold">Público</div>
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                className="w-full bg-gobai-cyan text-white hover:bg-gobai-cyan-light font-bold h-12"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Metadatos & Portada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUploadField 
                label="Imagen de Portada *"
                value={mainImage}
                onChange={setMainImage}
              />

              <div className="space-y-2">
                <Label htmlFor="tag" className="text-white/80 flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5" /> Etiqueta
                </Label>
                <Input
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-white/80 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" /> Ubicación
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-white/80 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" /> Fecha
                </Label>
                <Input
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Image as ImageIcon, Upload, Link as LinkIcon, X, Loader2 } from "lucide-react"
import { uploadImageAction } from "@/app/actions/upload"
import { toast } from "sonner"
import Image from "next/image"

interface ImageUploadModalProps {
  onSelect: (url: string) => void
}

export function ImageUploadModal({ onSelect }: ImageUploadModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tab, setTab] = useState<"upload" | "url">("upload")
  const [url, setUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 10MB limit check
      if (file.size > 10 * 1024 * 1024) {
        toast.error("La imagen es demasiado grande. El tamaño máximo permitido es 10MB.")
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Selecciona un archivo primero")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const result = await uploadImageAction(formData)
      if (result.success && result.url) {
        onSelect(result.url)
        setIsOpen(false)
        resetState()
      } else {
        toast.error(result.error || "Error al subir imagen")
      }
    } catch (error) {
      toast.error("Error inesperado al subir imagen")
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlSubmit = () => {
    if (!url) {
      toast.error("Introduce una URL válida")
      return
    }
    onSelect(url)
    setIsOpen(false)
    resetState()
  }

  const resetState = () => {
    setPreview(null)
    setSelectedFile(null)
    setUrl("")
    setTab("upload")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetState()
    }}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-white/60 hover:text-gobai-cyan hover:bg-white/5"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#00040a] border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-gobai-cyan" />
            Insertar Imagen
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 p-1 bg-white/5 rounded-lg mb-6">
          <button
            onClick={() => setTab("upload")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all text-xs font-bold uppercase tracking-widest ${tab === 'upload' ? 'bg-gobai-cyan text-[#00040a]' : 'text-white/60 hover:text-white'}`}
          >
            <Upload className="h-3 w-3" />
            Subir Archivo
          </button>
          <button
            onClick={() => setTab("url")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all text-xs font-bold uppercase tracking-widest ${tab === 'url' ? 'bg-gobai-cyan text-[#00040a]' : 'text-white/60 hover:text-white'}`}
          >
            <LinkIcon className="h-3 w-3" />
            URL Externa
          </button>
        </div>

        {tab === "upload" ? (
          <div className="space-y-6">
            {!preview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-gobai-cyan/50 hover:bg-gobai-cyan/5 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="h-8 w-8 text-white/40 group-hover:text-gobai-cyan" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white/80">Haz clic para subir</p>
                  <p className="text-xs text-white/40 mt-1">PNG, JPG o WebP (Máx. 10MB)</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <Image 
                    src={preview} 
                    alt="Vista previa" 
                    fill 
                    className="object-contain"
                  />
                  <button 
                    onClick={() => {
                      setPreview(null)
                      setSelectedFile(null)
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full bg-gobai-cyan text-[#00040a] font-bold hover:bg-gobai-cyan-light"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    "Confirmar y Subir"
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-white/60">Enlace de la imagen</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="bg-white/5 border-white/10 text-white focus:border-gobai-cyan"
              />
            </div>
            
            {url && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <img 
                  src={url} 
                  alt="Vista previa URL" 
                  className="w-full h-full object-contain"
                  onError={() => toast.error("URL de imagen no válida")}
                />
              </div>
            )}

            <Button 
              onClick={handleUrlSubmit}
              disabled={!url}
              className="w-full bg-gobai-cyan text-[#00040a] font-bold hover:bg-gobai-cyan-light"
            >
              Insertar desde URL
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

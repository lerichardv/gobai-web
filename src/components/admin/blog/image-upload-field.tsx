"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, X, Upload, Link as LinkIcon, Loader2 } from "lucide-react"
import { uploadImageAction } from "@/app/actions/upload"
import { toast } from "sonner"
import Image from "next/image"

interface ImageUploadFieldProps {
  label: string
  value: string | null | undefined
  onChange: (url: string | null) => void
  description?: string
}

export function ImageUploadField({ label, value, onChange, description }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<'upload' | 'url'>('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 10MB limit check
    if (file.size > 10 * 1024 * 1024) {
      toast.error("La imagen es demasiado grande. El tamaño máximo permitido es 10MB.")
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const result = await uploadImageAction(formData)
      if (result.error) {
        toast.error(result.error)
      } else if (result.url) {
        onChange(result.url)
        toast.success("Imagen subida correctamente")
      }
    } catch (error) {
      toast.error("Error al subir la imagen")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-white/80">{label}</Label>
        {value && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onChange(null)}
            className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2"
          >
            <X className="h-3 w-3 mr-1" /> Quitar
          </Button>
        )}
      </div>

      {value ? (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/20 group">
          <Image 
            src={value} 
            alt={label} 
            fill 
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-black hover:bg-white/90"
            >
              Cambiar Imagen
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => setUploadMode('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${uploadMode === 'upload' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              <Upload className="h-3 w-3" /> Subir
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('url')}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-bold transition-all ${uploadMode === 'url' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              <LinkIcon className="h-3 w-3" /> URL
            </button>
          </div>

          {uploadMode === 'upload' ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-gobai-cyan/50 hover:bg-gobai-cyan/5 transition-all cursor-pointer group"
            >
              {isUploading ? (
                <Loader2 className="h-8 w-8 text-gobai-cyan animate-spin" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gobai-cyan/10 transition-colors">
                  <Upload className="h-6 w-6 text-white/40 group-hover:text-gobai-cyan" />
                </div>
              )}
              <div className="text-center">
                <p className="text-sm font-bold text-white/80">Haz clic para subir</p>
                <p className="text-xs text-white/40 mt-1">PNG, JPG o WebP (Máx. 10MB)</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input 
                placeholder="https://..." 
                className="bg-white/5 border-white/10 text-white h-9 text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onChange((e.target as HTMLInputElement).value)
                  }
                }}
              />
              <Button size="sm" className="h-9 px-4">Ok</Button>
            </div>
          )}
        </div>
      )}

      {description && <p className="text-[10px] text-white/40 italic">{description}</p>}

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  )
}

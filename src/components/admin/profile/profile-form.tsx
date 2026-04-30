"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { updateUserProfile } from "@/app/actions/user"
import { toast } from "sonner"
import { User, Eye, UserCheck } from "lucide-react"

interface ProfileFormProps {
  user: {
    name: string | null
    email: string | null
    authorVisibility: string
    customAuthor: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name || "")
  const [authorVisibility, setAuthorVisibility] = useState(user.authorVisibility)
  const [customAuthor, setCustomAuthor] = useState(user.customAuthor || "")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateUserProfile({
        name,
        authorVisibility,
        customAuthor: authorVisibility === "CUSTOM" ? customAuthor : null
      })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Perfil actualizado correctamente")
      }
    } catch (error) {
      toast.error("Error al actualizar el perfil")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gobai-cyan/10">
            <User className="h-5 w-5 text-gobai-cyan" />
          </div>
          <div>
            <CardTitle className="text-white">Información del Perfil</CardTitle>
            <CardDescription className="text-white/40">
              Actualiza tu nombre y cómo deseas aparecer en tus publicaciones.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">Nombre Completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="Tu nombre real"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Correo Electrónico</Label>
              <Input
                id="email"
                value={user.email || ""}
                className="bg-white/5 border-white/10 text-white/40"
                disabled
              />
              <p className="text-[10px] text-white/20 italic">El correo no puede ser modificado.</p>
            </div>
          </div>

          <div className="h-px bg-white/5 my-4" />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gobai-cyan" />
              <Label className="text-white font-bold uppercase tracking-widest text-[10px]">Visibilidad de Autor</Label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Mostrar como...</Label>
                <Select value={authorVisibility} onValueChange={setAuthorVisibility}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Selecciona visibilidad" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                    <SelectItem value="FULL_NAME">Nombre Completo</SelectItem>
                    <SelectItem value="FIRST_NAME">Solo Nombre</SelectItem>
                    <SelectItem value="LAST_NAME">Solo Apellido</SelectItem>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="CUSTOM">Nombre Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {authorVisibility === "CUSTOM" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                  <Label htmlFor="customAuthor" className="text-white/80">Nombre de Autor Único</Label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                    <Input
                      id="customAuthor"
                      value={customAuthor}
                      onChange={(e) => setCustomAuthor(e.target.value)}
                      className="bg-white/5 border-white/10 text-white pl-10"
                      placeholder="@seudonimo"
                      required={authorVisibility === "CUSTOM"}
                    />
                  </div>
                  <p className="text-[10px] text-white/40">Este nombre será el que se vea en tus artículos.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gobai-cyan text-white hover:bg-gobai-cyan-light font-bold px-8 transition-all hover:scale-105 active:scale-95"
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

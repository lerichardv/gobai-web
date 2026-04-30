"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, UserPlus, UserCircle } from "lucide-react"
import { createUser, updateUser } from "@/app/actions/user-management"
import { toast } from "sonner"

interface UserFormDialogProps {
  user?: {
    id: string
    name: string | null
    email: string | null
  }
  trigger?: React.ReactNode
}

export function UserFormDialog({ user, trigger }: UserFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const isEdit = !!user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = isEdit 
        ? await updateUser(user.id, { name, email, password })
        : await createUser({ name, email, password })

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(isEdit ? "Usuario actualizado" : "Usuario creado")
        setOpen(false)
        if (!isEdit) {
          setName("")
          setEmail("")
          setPassword("")
        }
      }
    } catch (error) {
      toast.error("Algo salió mal")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gobai-cyan text-white hover:bg-gobai-cyan-light font-bold">
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0a0a] border-white/10 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gobai-cyan/10">
                <UserCircle className="h-5 w-5 text-gobai-cyan" />
              </div>
              <DialogTitle>{isEdit ? "Editar Usuario" : "Crear Usuario"}</DialogTitle>
            </div>
            <DialogDescription className="text-white/40">
              {isEdit 
                ? "Modifica los datos del usuario. Deja la contraseña en blanco para no cambiarla." 
                : "Añade un nuevo miembro al equipo de administración."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white/60">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="Nombre completo"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white/60">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password text-white/60">
                {isEdit ? "Nueva Contraseña (Opcional)" : "Contraseña"}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder={isEdit ? "••••••••" : "Mínimo 6 caracteres"}
                required={!isEdit}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gobai-cyan text-white hover:bg-gobai-cyan-light font-bold w-full"
            >
              {isLoading ? "Guardando..." : isEdit ? "Guardar Cambios" : "Crear Usuario"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

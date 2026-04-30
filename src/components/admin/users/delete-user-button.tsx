"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { deleteUser } from "@/app/actions/user-management"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface DeleteUserButtonProps {
  userId: string
  userName: string | null
  userEmail: string | null
}

export function DeleteUserButton({ userId, userName, userEmail }: DeleteUserButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()

  const isSelf = session?.user?.email === userEmail

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteUser(userId)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Usuario eliminado")
      }
    } catch (error) {
      toast.error("Error al eliminar el usuario")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSelf) return null

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white/60 hover:text-red-500 hover:bg-red-500/10 transition-colors">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#0a0a0a] border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-white/40">
            Esta acción no se puede deshacer. Se eliminará permanentemente al usuario{" "}
            <span className="text-white font-bold">{userName || userEmail}</span> y todos sus datos asociados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600 font-bold"
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar Usuario"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteSuccessCase } from "@/app/actions/success-cases"
import { toast } from "sonner"
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

interface DeleteCaseButtonProps {
  caseId: string
  caseTitle: string
}

export function DeleteCaseButton({ caseId, caseTitle }: DeleteCaseButtonProps) {
  const handleDelete = async () => {
    try {
      const result = await deleteSuccessCase(caseId)
      if (result.success) {
        toast.success("Caso de éxito eliminado correctamente")
      } else {
        toast.error(result.error || "Error al eliminar el caso de éxito")
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white/60 hover:text-red-400 hover:bg-red-400/10">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#0a0a0a] border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-white/40">
            Esta acción no se puede deshacer. Se eliminará permanentemente el caso de éxito 
            <span className="text-white font-bold"> "{caseTitle}"</span> y todos sus datos asociados de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600 font-bold"
          >
            Eliminar Caso de Éxito
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

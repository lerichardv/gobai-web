'use client';

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: Date;
}

export function SubmissionDetailsDialog({ submission }: { submission: Submission }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white/60 hover:text-gobai-cyan hover:bg-gobai-cyan/10">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Detalles del Contacto</DialogTitle>
          <DialogDescription className="text-white/40">
            Recibido el {new Date(submission.createdAt).toLocaleString('es-ES')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nombre</label>
              <p className="text-white font-medium">{submission.name}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Email</label>
              <p className="text-white font-medium">{submission.email}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Teléfono</label>
              <p className="text-white font-medium">{submission.phone || 'No proporcionado'}</p>
            </div>
          </div>
          <div className="space-y-1 pt-4 border-t border-white/5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Mensaje</label>
            <div className="bg-white/5 rounded-xl p-4 mt-2">
              <p className="text-white/80 whitespace-pre-wrap leading-relaxed text-sm">
                {submission.message}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

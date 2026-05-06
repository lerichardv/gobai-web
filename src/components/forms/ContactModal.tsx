'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";
import { RiSparklingFill } from "@remixicon/react";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function ContactModal({ isOpen, onOpenChange, title, description }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] lg:max-w-7xl bg-[#00040a] border-white/10 p-0 overflow-hidden rounded-[40px] h-[90vh] lg:h-auto">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Welcome Side */}
          <div className="lg:w-1/3 bg-gradient-to-br from-gobai-blue-dark via-[#00040a] to-gobai-cyan/20 p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-gobai-cyan) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
            
            <DialogHeader className="relative z-10 text-left">
              <div className="w-16 h-16 bg-gobai-cyan/20 rounded-3xl flex items-center justify-center mb-8">
                <RiSparklingFill className="text-gobai-cyan w-8 h-8" />
              </div>
              <DialogTitle className="text-3xl lg:text-4xl font-bold text-white mb-6 uppercase tracking-tight leading-tight">
                {title || "¡Estamos listos para impulsarte!"}
              </DialogTitle>
              <DialogDescription className="text-white/60 text-base lg:text-lg leading-relaxed">
                {description || "Gracias por tu interés en GOBAI. Completa este breve formulario y un especialista se pondrá en contacto contigo de inmediato para comenzar tu transformación digital."}
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form Side */}
          <div className="lg:w-2/3 p-8 lg:p-20 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <ContactForm standalone={false} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

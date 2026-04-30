"use client"

import { Button } from "@/components/ui/button"
import { Link2 } from "lucide-react"
import { toast } from "sonner"

interface CopyLinkButtonProps {
  slug: string
  language: string
}

export function CopyLinkButton({ slug, language }: CopyLinkButtonProps) {
  const handleCopy = () => {
    const url = `${window.location.origin}/${language}/blog/${slug}`
    navigator.clipboard.writeText(url)
    toast.success("Enlace copiado al portapapeles")
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-white/60 hover:text-gobai-cyan hover:bg-gobai-cyan/10"
      onClick={handleCopy}
      title="Copiar enlace público"
    >
      <Link2 className="h-4 w-4" />
    </Button>
  )
}

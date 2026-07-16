"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { requestPasswordReset } from "@/app/actions/auth"
import { toast } from "sonner"
import { CheckCircle2, ArrowLeft } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo válido.",
  }),
})

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await requestPasswordReset(values)

      if (result.error) {
        setError(result.error)
        toast.error(result.error)
      } else {
        toast.success("Solicitud procesada correctamente.")
        setIsSubmitted(true)
      }
    } catch (err) {
      setError("Ocurrió un error inesperado")
      toast.error("Ocurrió un error inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-48 h-16">
          <Image
            src="/img/gobai-blue-gradient-logo.png"
            alt="Gobai Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        {!isSubmitted ? (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-center text-white">
                ¿Olvidaste tu contraseña?
              </CardTitle>
              <CardDescription className="text-center text-white/60">
                Ingresa tu correo electrónico para recibir un enlace de recuperación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="nombre@ejemplo.com"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gobai-cyan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {error && (
                    <div className="p-3 text-sm font-medium text-white bg-red-500/20 border border-red-500/50 rounded-md text-center">
                      {error}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gobai-blue-light to-gobai-cyan text-white hover:opacity-90 transition-all font-bold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enviando enlace..." : "Enviar Enlace de Recuperación"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-white/60">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 font-bold text-gobai-cyan hover:text-gobai-cyan-light transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver al inicio de sesión
                </Link>
              </div>
            </CardFooter>
          </>
        ) : (
          <>
            <CardContent className="pt-8 pb-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-3 bg-gobai-cyan/10 text-gobai-cyan rounded-full animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-white">
                Correo Enviado
              </CardTitle>
              <CardDescription className="text-white/60 text-sm max-w-sm">
                Si tu correo electrónico está registrado en nuestra plataforma, recibirás un mensaje con un enlace para restablecer tu contraseña en breve.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col pb-8">
              <Link
                href="/auth/login"
                className="w-full text-center py-2 border border-white/10 hover:bg-white/5 text-white transition-colors rounded-md text-sm font-semibold"
              >
                Volver a Iniciar Sesión
              </Link>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

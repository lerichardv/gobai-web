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
import { resetPassword } from "@/app/actions/auth"
import { toast } from "sonner"
import { CheckCircle2, AlertTriangle } from "lucide-react"

const formSchema = z.object({
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Por favor confirma tu contraseña.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

interface ResetPasswordFormProps {
  token: string | null
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      setError("Falta el token de restablecimiento de contraseña.")
      toast.error("Falta el token de restablecimiento de contraseña.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await resetPassword({
        token,
        password: values.password,
      })

      if (result.error) {
        setError(result.error)
        toast.error(result.error)
      } else {
        toast.success("Tu contraseña ha sido restablecida exitosamente.")
        setIsSuccess(true)
      }
    } catch (err) {
      setError("Ocurrió un error inesperado")
      toast.error("Ocurrió un error inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle case where token is missing or undefined
  if (!token) {
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
          <CardContent className="pt-8 pb-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-full animate-bounce">
              <AlertTriangle className="w-12 h-12" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              Enlace Inválido
            </CardTitle>
            <CardDescription className="text-white/60 text-sm max-w-sm">
              Este enlace para restablecer la contraseña no contiene un token válido. Por favor, solicita un nuevo enlace.
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col pb-8">
            <Link
              href="/auth/forgot-password"
              className="w-full text-center py-2 bg-gradient-to-r from-gobai-blue-light to-gobai-cyan text-white hover:opacity-90 transition-all rounded-md text-sm font-semibold"
            >
              Solicitar Nuevo Enlace
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
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
        {!isSuccess ? (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-center text-white">
                Restablecer Contraseña
              </CardTitle>
              <CardDescription className="text-center text-white/60">
                Ingresa tu nueva contraseña para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Nueva Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-gobai-cyan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Confirmar Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
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
                    {isLoading ? "Restableciendo..." : "Guardar Contraseña"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
          <>
            <CardContent className="pt-8 pb-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-3 bg-gobai-cyan/10 text-gobai-cyan rounded-full animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-white">
                Contraseña Actualizada
              </CardTitle>
              <CardDescription className="text-white/60 text-sm max-w-sm">
                Tu contraseña ha sido restablecida exitosamente. Ahora puedes ingresar a tu cuenta.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col pb-8">
              <Link
                href="/auth/login"
                className="w-full text-center py-2 bg-gradient-to-r from-gobai-blue-light to-gobai-cyan text-white hover:opacity-90 transition-all rounded-md text-sm font-semibold"
              >
                Iniciar Sesión
              </Link>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

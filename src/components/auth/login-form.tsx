"use client"

import { toast } from "sonner"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
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

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo válido.",
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Correo o contraseña inválidos")
        toast.error("Correo o contraseña inválidos")
      } else {
        toast.success("¡Bienvenido de nuevo!")
        router.push("/admin/dashboard")
        router.refresh()
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
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center text-white">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-center text-white/60">
            Ingresa tus credenciales para acceder a tu cuenta
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-white/80">Contraseña</FormLabel>
                      <Link
                        href="#"
                        className="text-sm font-medium text-gobai-cyan hover:text-gobai-cyan-light transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
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
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-white/60">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/auth/register"
              className="font-bold text-gobai-cyan hover:text-gobai-cyan-light transition-colors"
            >
              Crea una ahora
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

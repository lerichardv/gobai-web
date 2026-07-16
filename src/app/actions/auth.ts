"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import crypto from "crypto"
import { resend } from "@/lib/resend"
import { ResetPasswordEmail } from "@/emails/ResetPassword"
import { headers } from "next/headers"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function registerUser(data: z.infer<typeof registerSchema>) {
  return { error: "Public registration is disabled. Please contact an administrator." }
}

const forgotPasswordSchema = z.object({
  email: z.string().email("Por favor ingresa un correo válido."),
})

export async function requestPasswordReset(data: z.infer<typeof forgotPasswordSchema>) {
  const result = forgotPasswordSchema.safeParse(data)
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors.email?.[0] || "Correo inválido" }
  }

  const { email } = result.data

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // If user does not exist, return success to prevent user enumeration
    if (!user) {
      return { success: true, message: "Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña." }
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 3600000) // 1 hour expiration

    // Delete any existing reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    })

    // Save token to DB
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    // Determine Base URL
    let baseUrl = process.env.NEXTAUTH_URL
    if (!baseUrl) {
      const headersList = await headers()
      const host = headersList.get("host")
      const protocol = host?.includes("localhost") ? "http" : "https"
      baseUrl = `${protocol}://${host}`
    }

    const resetLink = `${baseUrl}/auth/reset-password?token=${token}`

    // Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "Resend <onboarding@resend.dev>",
      to: email,
      subject: "Restablecer tu contraseña | Gobai",
      react: ResetPasswordEmail({ resetLink }),
    })

    if (emailError) {
      console.error("Resend API Error:", emailError)
      return { error: "No se pudo enviar el correo de recuperación. Inténtalo más tarde." }
    }

    console.log("Password reset email sent successfully:", emailData)
    return { success: true, message: "Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña." }

  } catch (error) {
    console.error("Forgot password error:", error)
    return { error: "Ocurrió un error inesperado. Inténtalo más tarde." }
  }
}

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token de restablecimiento requerido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
})

export async function resetPassword(data: z.infer<typeof resetPasswordSchema>) {
  const result = resetPasswordSchema.safeParse(data)
  if (!result.success) {
    return { 
      error: result.error.flatten().fieldErrors.password?.[0] || 
             result.error.flatten().fieldErrors.token?.[0] || 
             "Datos inválidos" 
    }
  }

  const { token, password } = result.data

  try {
    // Find reset token in DB
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!resetToken || resetToken.expires < new Date()) {
      return { error: "El enlace de restablecimiento es inválido o ha expirado." }
    }

    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    })

    if (!user) {
      return { error: "No se encontró el usuario para este token." }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update password and delete token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      }),
    ])

    return { success: true }

  } catch (error) {
    console.error("Reset password error:", error)
    return { error: "Ocurrió un error inesperado. Inténtalo más tarde." }
  }
}


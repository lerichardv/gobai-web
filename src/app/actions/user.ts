"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function getUserProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        authorVisibility: true,
        customAuthor: true,
        image: true
      }
    })
    return user
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export async function updateUserProfile(data: {
  name: string
  authorVisibility: string
  customAuthor?: string | null
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return { error: "No autorizado" }

  try {
    // If custom author is provided, check uniqueness (excluding current user)
    if (data.customAuthor) {
      const existing = await prisma.user.findFirst({
        where: {
          customAuthor: data.customAuthor,
          NOT: { email: session.user.email }
        }
      })
      if (existing) {
        return { error: "El nombre de autor personalizado ya está en uso por otro usuario." }
      }
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: data.name,
        authorVisibility: data.authorVisibility,
        customAuthor: data.customAuthor || null
      }
    })

    revalidatePath("/admin/profile")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating profile:", error)
    return { error: "Error al actualizar el perfil" }
  }
}

export async function updateUserPassword(data: {
  currentPassword: string
  newPassword: string
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return { error: "No autorizado" }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || !user.password) {
      return { error: "Usuario no encontrado" }
    }

    const isCorrect = await bcrypt.compare(data.currentPassword, user.password)
    if (!isCorrect) {
      return { error: "La contraseña actual es incorrecta" }
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10)

    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword }
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating password:", error)
    return { error: "Error al actualizar la contraseña" }
  }
}

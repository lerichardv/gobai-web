"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

export async function getAllUsers(page: number = 1, pageSize: number = 10) {
  const session = await getServerSession(authOptions)
  if (!session) return { users: [], total: 0, totalPages: 0, currentPage: 1 }

  const skip = (page - 1) * pageSize
  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: pageSize,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          authorVisibility: true,
          customAuthor: true,
        },
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.user.count()
    ])
    return { 
      users, 
      total, 
      totalPages: Math.ceil(total / pageSize),
      currentPage: page 
    }
  } catch (error) {
    console.error("Error fetching users:", error)
    return { users: [], total: 0, totalPages: 0, currentPage: 1 }
  }
}

export async function createUser(data: {
  name: string
  email: string
  password?: string
}) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: "No autorizado" }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existing) {
      return { error: "El correo electrónico ya está registrado" }
    }

    const hashedPassword = await bcrypt.hash(data.password || "Gobai2026!", 10)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      }
    })

    revalidatePath("/admin/users")
    return { success: true, user }
  } catch (error) {
    console.error("Error creating user:", error)
    return { error: "Error al crear el usuario" }
  }
}

export async function updateUser(id: string, data: {
  name: string
  email: string
  password?: string
}) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: "No autorizado" }

  try {
    const updateData: any = {
      name: data.name,
      email: data.email,
    }

    if (data.password && data.password.trim() !== "") {
      updateData.password = await bcrypt.hash(data.password, 10)
    }

    await prisma.user.update({
      where: { id },
      data: updateData
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Error updating user:", error)
    return { error: "Error al actualizar el usuario" }
  }
}

export async function deleteUser(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return { error: "No autorizado" }

  try {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (currentUser?.id === id) {
      return { error: "No puedes eliminar tu propio usuario" }
    }

    await prisma.user.delete({
      where: { id }
    })

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { error: "Error al eliminar el usuario" }
  }
}

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getAdminSuccessCases(
  page: number = 1, 
  pageSize: number = 10,
  search?: string,
  language?: string,
  status?: string
) {
  const skip = (page - 1) * pageSize
  
  const where: any = {}
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } },
      { tag: { contains: search, mode: 'insensitive' } }
    ]
  }
  
  if (language && language !== 'all') {
    where.language = language
  }
  
  if (status && status !== 'all') {
    where.published = status === 'published'
  }

  try {
    const [cases, total] = await Promise.all([
      prisma.successCase.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          createdAt: "desc"
        }
      }),
      prisma.successCase.count({ where })
    ])
    return { 
      cases, 
      total, 
      totalPages: Math.ceil(total / pageSize),
      currentPage: page 
    }
  } catch (error) {
    console.error("Error fetching admin success cases:", error)
    return { cases: [], total: 0, totalPages: 0, currentPage: 1 }
  }
}

export async function getSuccessCases(locale: string = 'es', publishedOnly: boolean = true) {
  try {
    return await prisma.successCase.findMany({
      where: {
        language: locale,
        ...(publishedOnly ? { published: true } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error fetching success cases:', error);
    return [];
  }
}

export async function getSuccessCaseBySlug(slug: string, locale: string = 'es') {
  try {
    return await prisma.successCase.findFirst({
      where: {
        slug,
        language: locale,
        published: true,
      },
    });
  } catch (error) {
    console.error('Error fetching success case by slug:', error);
    return null;
  }
}

export async function createSuccessCase(data: {
  title: string
  slug: string
  description: string
  content: string
  language: string
  mainImage?: string | null
  images?: string[]
  tag?: string | null
  location?: string | null
  date?: string | null
  published?: boolean
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { error: "No autorizado" }
  }

  try {
    const successCase = await prisma.successCase.create({
      data: {
        ...data,
        images: data.images || []
      }
    })
    revalidatePath("/admin/success-cases")
    revalidatePath("/casos-de-exito")
    return { success: true, successCase }
  } catch (error: any) {
    console.error("Error creating success case:", error)
    if (error.code === 'P2002') {
      return { error: "El slug ya existe, elige otro." }
    }
    return { error: "Error al crear el caso de éxito" }
  }
}

export async function updateSuccessCase(id: string, data: {
  title: string
  slug: string
  description: string
  content: string
  language: string
  mainImage?: string | null
  images?: string[]
  tag?: string | null
  location?: string | null
  date?: string | null
  published?: boolean
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "No autorizado" }
  }

  try {
    const successCase = await prisma.successCase.update({
      where: { id },
      data: {
        ...data,
        images: data.images || []
      }
    })
    revalidatePath("/admin/success-cases")
    revalidatePath("/casos-de-exito")
    revalidatePath(`/casos-de-exito/${data.slug}`)
    return { success: true, successCase }
  } catch (error: any) {
    console.error("Error updating success case:", error)
    if (error.code === 'P2002') {
      return { error: "El slug ya existe, elige otro." }
    }
    return { error: "Error al actualizar el caso de éxito" }
  }
}

export async function deleteSuccessCase(id: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "No autorizado" }
  }

  try {
    await prisma.successCase.delete({
      where: { id }
    })
    revalidatePath("/admin/success-cases")
    revalidatePath("/casos-de-exito")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting success case:", error)
    return { error: "Error al eliminar el caso de éxito" }
  }
}

export async function getSuccessCaseById(id: string) {
  try {
    return await prisma.successCase.findUnique({
      where: { id }
    })
  } catch (error) {
    return null
  }
}

export async function duplicateSuccessCase(id: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "No autorizado" }
  }

  try {
    const original = await prisma.successCase.findUnique({
      where: { id }
    })

    if (!original) {
      return { error: "Caso de éxito no encontrado" }
    }

    let newSlug = `${original.slug}-copy`
    let count = 1
    while (await prisma.successCase.findUnique({ where: { slug: newSlug } })) {
      newSlug = `${original.slug}-copy-${count}`
      count++
    }

    const duplicated = await prisma.successCase.create({
      data: {
        ...original,
        id: undefined,
        title: `${original.title} (Copia)`,
        slug: newSlug,
        published: false,
        createdAt: undefined,
        updatedAt: undefined
      }
    })

    revalidatePath("/admin/success-cases")
    return { success: true, successCase: duplicated }
  } catch (error) {
    console.error("Error duplicating success case:", error)
    return { error: "Error al duplicar el caso de éxito" }
  }
}

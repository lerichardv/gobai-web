"use server"
// Action updated to sync with new Prisma model

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getBlogPosts(
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
      { slug: { contains: search, mode: 'insensitive' } }
    ]
  }
  
  if (language && language !== 'all') {
    where.language = language
  }
  
  if (status && status !== 'all') {
    where.published = status === 'published'
  }

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          author: {
            select: {
              name: true,
              email: true,
              image: true,
              authorVisibility: true,
              customAuthor: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }),
      prisma.post.count({ where })
    ])
    return { 
      posts, 
      total, 
      totalPages: Math.ceil(total / pageSize),
      currentPage: page 
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return { posts: [], total: 0, totalPages: 0, currentPage: 1 }
  }
}

export async function getPublishedBlogPosts(language: string = "es") {
  try {
    return await prisma.post.findMany({
      where: {
        published: true,
        language: language
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
            authorVisibility: true,
            customAuthor: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function createBlogPost(data: {
  title: string
  slug: string
  content: string
  language: string
  featuredImage?: string | null
  headingBackgroundImage?: string | null
  showFeaturedImage?: boolean
  published?: boolean
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return { error: "No autorizado" }
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return { error: "Usuario no encontrado" }
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        language: data.language,
        featuredImage: data.featuredImage ?? null,
        headingBackgroundImage: data.headingBackgroundImage ?? null,
        showFeaturedImage: data.showFeaturedImage ?? true,
        published: data.published || false,
        authorId: user.id
      }
    })
    revalidatePath("/admin/blog")
    return { success: true, post }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "El slug ya existe, elige otro." }
    }
    return { error: "Error al crear el artículo" }
  }
}

export async function updateBlogPost(id: string, data: {
  title: string
  slug: string
  content: string
  language: string
  featuredImage?: string | null
  headingBackgroundImage?: string | null
  showFeaturedImage?: boolean
  published?: boolean
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "No autorizado" }
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        language: data.language,
        featuredImage: data.featuredImage ?? null,
        headingBackgroundImage: data.headingBackgroundImage ?? null,
        showFeaturedImage: data.showFeaturedImage ?? true,
        published: data.published
      }
    })
    revalidatePath("/admin/blog")
    return { success: true, post }
  } catch (error: any) {
    console.error("Error updating blog post:", error)
    if (error.code === 'P2002') {
      return { error: "El slug ya existe, elige otro." }
    }
    return { error: "Error al actualizar el artículo: " + (error.message || "Error desconocido") }
  }
}

export async function deleteBlogPost(id: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "No autorizado" }
  }

  try {
    await prisma.post.delete({
      where: { id }
    })
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting blog post:", error)
    return { error: "Error al eliminar el artículo: " + (error.message || "Error desconocido") }
  }
}

export async function getBlogPostById(id: string) {
  try {
    return await prisma.post.findUnique({
      where: { id }
    })
  } catch (error) {
    return null
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug, published: true },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
            authorVisibility: true,
            customAuthor: true
          }
        }
      }
    })
  } catch (error) {
    return null
  }
}

export async function duplicateBlogPost(id: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "No autorizado" }
  }

  try {
    const originalPost = await prisma.post.findUnique({
      where: { id }
    })

    if (!originalPost) {
      return { error: "Artículo no encontrado" }
    }

    // Generate a unique slug for the duplicate
    let newSlug = `${originalPost.slug}-copy`
    let count = 1
    
    // Check if slug exists and increment count if needed
    while (await prisma.post.findUnique({ where: { slug: newSlug } })) {
      newSlug = `${originalPost.slug}-copy-${count}`
      count++
    }

    const duplicatedPost = await prisma.post.create({
      data: {
        title: `${originalPost.title} (Copia ${count > 1 ? count - 1 : ''})`.trim(),
        slug: newSlug,
        content: originalPost.content,
        language: originalPost.language,
        featuredImage: originalPost.featuredImage,
        headingBackgroundImage: originalPost.headingBackgroundImage,
        showFeaturedImage: originalPost.showFeaturedImage,
        published: false,
        authorId: originalPost.authorId
      }
    })

    revalidatePath("/admin/blog")
    return { success: true, post: duplicatedPost }
  } catch (error) {
    console.error("Error duplicating post:", error)
    return { error: "Error al duplicar el artículo" }
  }
}

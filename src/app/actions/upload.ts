"use server"

import { getStore } from "@netlify/blobs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function uploadImageAction(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "No autorizado" }
  }

  const file = formData.get("file") as File
  if (!file) {
    return { error: "No se ha proporcionado ningún archivo" }
  }

  try {
    const store = getStore("articles")
    
    // Clean filename and add timestamp to ensure uniqueness
    const timestamp = Date.now()
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const blobName = `${timestamp}-${cleanName}`
    
    const arrayBuffer = await file.arrayBuffer()
    
    await store.set(blobName, arrayBuffer)
    
    // Construct the proxy URL
    // We use a relative path so it works across environments
    const url = `/api/blobs/articles/${blobName}`
    
    return { success: true, url }
  } catch (error) {
    console.error("Upload error:", error)
    return { error: "Error al subir la imagen a Netlify Blobs" }
  }
}

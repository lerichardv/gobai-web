"use server"

import { getStore } from "@netlify/blobs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { optimizeImage } from "@/lib/image-utils"

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
    // We'll use .webp extension since optimizeImage returns webp
    const blobName = `${timestamp}-${cleanName.split('.')[0]}.webp`
    
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    console.log(`Original size: ${(buffer.length / 1024).toFixed(2)} KB`)
    
    // Optimize the image
    const optimizedBuffer = await optimizeImage(buffer)
    
    console.log(`Optimized size: ${(optimizedBuffer.length / 1024).toFixed(2)} KB`)
    
    // Convert Buffer to ArrayBuffer for Netlify Blobs compatibility
    const arrayBufferFinal = optimizedBuffer.buffer.slice(
      optimizedBuffer.byteOffset,
      optimizedBuffer.byteOffset + optimizedBuffer.byteLength
    )
    await store.set(blobName, arrayBufferFinal as any)
    
    // Construct the proxy URL
    const url = `/api/blobs/articles/${blobName}`
    
    return { success: true, url }
  } catch (error) {
    console.error("Upload error:", error)
    return { error: "Error al subir la imagen a Netlify Blobs" }
  }
}

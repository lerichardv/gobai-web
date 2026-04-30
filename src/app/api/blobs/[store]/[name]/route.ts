import { getStore } from "@netlify/blobs"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ store: string; name: string }> }
) {
  try {
    const { store: storeName, name } = await params
    const store = getStore(storeName)
    
    const blob = await store.get(name, { type: "blob" })
    
    if (!blob) {
      return new NextResponse("Not Found", { status: 404 })
    }

    // Determine content type based on extension
    const ext = name.split('.').pop()?.toLowerCase()
    let contentType = "application/octet-stream"
    
    if (ext === "jpg" || ext === "jpeg") contentType = "image/jpeg"
    else if (ext === "png") contentType = "image/png"
    else if (ext === "gif") contentType = "image/gif"
    else if (ext === "webp") contentType = "image/webp"
    else if (ext === "svg") contentType = "image/svg+xml"

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    })
  } catch (error) {
    console.error("Blob retrieval error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

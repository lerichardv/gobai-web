import sharp from 'sharp';

const MAX_SIZE_BYTES = 300 * 1024; // 300KB
const INITIAL_QUALITY = 80;
const MIN_QUALITY = 40;
const MAX_WIDTH = 1920;

/**
 * Optimizes an image to reach a target size (default 300KB) by gradually
 * reducing quality and resizing if necessary.
 */
export async function optimizeImage(buffer: Buffer): Promise<Buffer> {
  let quality = INITIAL_QUALITY;
  let width = MAX_WIDTH;
  let optimizedBuffer = buffer;
  
  // Initial attempt: convert to webp and set max width
  const image = sharp(buffer);
  const metadata = await image.metadata();
  
  // If it's already small enough and not huge, we still convert to webp for consistency
  // but if it's really small we might just return the original if it's a web-friendly format
  if (buffer.length <= MAX_SIZE_BYTES && metadata.format === 'webp' && (metadata.width || 0) <= MAX_WIDTH) {
    return buffer;
  }

  // Loop to find the best balance of quality and size
  while (true) {
    const pipeline = sharp(buffer)
      .resize({ width, withoutEnlargement: true });

    // Use webp for better compression-to-quality ratio
    optimizedBuffer = await pipeline
      .webp({ quality, effort: 4 })
      .toBuffer();

    if (optimizedBuffer.length <= MAX_SIZE_BYTES || (quality <= MIN_QUALITY && width <= 800)) {
      break;
    }

    // Gradually reduce quality first
    if (quality > MIN_QUALITY) {
      quality -= 10;
    } else {
      // If quality is at minimum, reduce dimensions and reset quality
      width = Math.round(width * 0.8);
      quality = INITIAL_QUALITY;
      
      // Safety break for very small width
      if (width < 400) break;
    }
  }

  return optimizedBuffer;
}

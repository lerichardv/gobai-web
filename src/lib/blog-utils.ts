/**
 * Returns the displayed author name based on visibility settings.
 */
export function getAuthorDisplayName(user: {
  name?: string | null
  email?: string | null
  authorVisibility?: string
  customAuthor?: string | null
}) {
  const { authorVisibility, customAuthor, name, email } = user
  
  if (!authorVisibility) return name || email || "Autor"

  switch (authorVisibility) {
    case 'FIRST_NAME':
      return name?.split(' ')[0] || name || "Autor"
    case 'LAST_NAME':
      return name?.split(' ').pop() || name || "Autor"
    case 'EMAIL':
      return email || name || "Autor"
    case 'CUSTOM':
      return customAuthor || name || "Autor"
    case 'FULL_NAME':
    default:
      return name || email || "Autor"
  }
}

/**
 * Strips HTML tags from a string and ignores headings for excerpts.
 */
export function stripHtml(html: string) {
  if (!html) return ''
  
  // Remove heading tags and their content
  const noHeadings = html.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, '')
  
  // Strip remaining tags and handle entities
  return noHeadings
    .replace(/<[^>]*>/g, ' ') // Replace tags with space to avoid merging words
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim()
}

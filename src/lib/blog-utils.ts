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

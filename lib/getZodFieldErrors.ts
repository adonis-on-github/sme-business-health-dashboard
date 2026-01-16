import type { z } from 'zod'

export function getFieldErrors<T>(error: z.ZodError<T>): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {}

  error.issues.forEach(issue => {
    // Join paths for nested objects (e.g., "address.city")
    const path = issue.path.join('.')

    if (!fieldErrors[path]) {
      fieldErrors[path] = []
    }
    fieldErrors[path].push(issue.message)
  })

  return fieldErrors
}
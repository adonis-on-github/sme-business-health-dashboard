import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import type { z } from 'zod'

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  if (typeof error === 'string') {
    return error
  }

  return 'An unknown error occurred'
}

export const getFieldErrors = <T>(error: z.ZodError<T>): Record<string, string[]> => {
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

export const  setServerErrors = <T extends FieldValues>(
  errors: Record<string, string[]>,
  setError: UseFormSetError<T>
) => {
  Object.entries(errors).forEach(([key, messages]) => {
    setError(key as Path<T>, {
      type: 'server',
      message: messages[0],
    })
  })
}
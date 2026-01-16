import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'

export function setServerErrors<T extends FieldValues>(
  errors: Record<string, string[]>,
  setError: UseFormSetError<T>
) {
  Object.entries(errors).forEach(([key, messages]) => {
    setError(key as Path<T>, {
      type: 'server',
      message: messages[0],
    })
  })
}
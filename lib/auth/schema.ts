import { z } from 'zod'

const MIN_PASSWORD_LENGTH = 6

export const authSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`),
  nextPath: z.string().optional(),
})

export type AuthSchema = z.infer<typeof authSchema>


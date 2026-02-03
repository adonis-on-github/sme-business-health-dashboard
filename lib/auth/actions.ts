'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

import { routes } from '@/lib/routes'
import { authSchema, type AuthSchema } from './schema'
import { getFieldErrors } from '@/lib/zod/error-utils'

type ErrorResult = {
  errors?: Record<string, string[]>
  message?: string
} | undefined

export const login = async (data: AuthSchema): Promise<ErrorResult> => {
  const parsedData = authSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      errors: getFieldErrors(parsedData.error)
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(parsedData.data)

  if (error) {
    return {
      message: error.message
    }
  }

  revalidatePath(routes.home, 'layout')
  redirect(data.nextPath ?? routes.business)
}

export const signup = async (data: AuthSchema): Promise<ErrorResult | undefined> => {
  const parsedData = authSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      errors: getFieldErrors(parsedData.error)
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp(parsedData.data)

  if (error) {
    return {
      message: error.message
    }
  }

  revalidatePath(routes.home, 'layout')
  redirect(routes.business)
}

export const logout = async () => {
  const supabase = await createClient()

  await supabase.auth.signOut()
  revalidatePath(routes.home, 'layout')
  redirect(routes.home)
}

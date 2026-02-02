'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { routes } from '@/lib/routes'
import type { LoginSchema } from './schema'

export const login = async (data: LoginSchema) => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return error.message
  }

  revalidatePath(routes.home, 'layout')
  redirect(data.nextPath ?? routes.business)
}

export const signup = async (data: LoginSchema) => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return error.message
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

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const login = async (formData: FormData) => {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  const next = formData.get('next') as string

  revalidatePath('/', 'layout')
  redirect(next || '/business')
}

export const signup = async (formData: FormData) => {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  const next = formData.get('next') as string

  revalidatePath('/', 'layout')
  redirect(next || '/business')
}

export const logout = async () => {
  const supabase = await createClient()

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

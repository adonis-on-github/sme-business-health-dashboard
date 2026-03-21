import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env/env'

export const createClient = (
  supabaseUrl: string = env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: string = env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
) => createBrowserClient(
    supabaseUrl,
    supabaseKey
  )

export const logout = async (supabaseClient: ReturnType<typeof createBrowserClient>) => {
  await supabaseClient.auth.signOut()
}

import { test as base } from '@playwright/test'

import type { User } from '@supabase/supabase-js'

import { env } from '@/lib/env/env'

import type { AuthSchema } from '@/lib/auth/schema'
import { createClient } from '@/lib/supabase/client'

type Data = {
  param: AuthSchema
}

type AuthFixture = {
  user: User
}

export const test = base.extend<Data & AuthFixture>({
  param: [{ email: 'test@example.com', password: 'test' }, { option: true }],

  user: async ({ param }, provide) => {
    const supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
    )

    const { data, error } = await supabase.auth.admin.createUser(param)

    if (error) {
      throw error
    }

    if (!data.user) {
      throw new Error('User not found')
    }

    await provide(data.user)

    const { error: deleteUserError } = await supabase.auth.admin.deleteUser(data.user.id)

    if (deleteUserError) {
      throw deleteUserError
    }
  }
})
import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/client'

const EMAIL = 'test@example.com'
const PASSWORD = 'test1234'

export const ensureUser = async (email: string = EMAIL, password: string = PASSWORD) => {
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
  )

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      email_verified: true,
    }
  })

  if (error) {
    throw error
  }

  if (!data.user) {
    throw new Error('User not found')
  }

  return { email, password, user: data.user }
}

export const purgeUser = async (email: string = EMAIL) => {
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
  )

  const { data: users, error: listError } = await supabase.auth.admin.listUsers()

  if (listError) {
    console.error('Could not fetch user list for cleanup', listError)

    return
  }

  const userToDelete = users.users.find(user => user.email === email)

  if (!userToDelete) {
    console.error('User not found for cleanup')

    return
  }

  const { error: deleteError } = await supabase.auth.admin.deleteUser(userToDelete.id)

  if (deleteError) {
    console.error('Could not delete user for cleanup', deleteError)
  }

  console.log('User deleted successfully')
}

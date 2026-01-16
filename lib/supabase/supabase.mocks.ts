import type { User } from '@supabase/supabase-js'

export const userMock = {
  id: 'user-123',
  email: 'user-123@supabase.com',
  app_metadata: {},
  user_metadata: {},
  aud: '',
  created_at: '',
} satisfies User
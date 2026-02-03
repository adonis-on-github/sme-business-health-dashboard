import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import type { AuthSchema } from './schema'

import { login, signup, logout } from './actions'
import type { SupabaseClient } from '@supabase/supabase-js'
import { routes } from '@/lib/routes'

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn()
}))

describe('login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe(('when user enters valid credentials'), () => {
    it('login successfully', async () => {
      const data: AuthSchema = {
        email: 'test@test.com',
        password: 'password',
      }

      vi.mocked(createClient).mockResolvedValue({
        auth: {
          signInWithPassword: vi.fn().mockResolvedValue({
            error: null,
          }),
        },
      } as unknown as SupabaseClient)

      await login(data)

      expect(revalidatePath).toHaveBeenCalledWith(routes.home, 'layout')
      expect(redirect).toHaveBeenCalledWith(routes.business)
    })

    describe('when there is a redirect path', () => {
      it('redirect to the redirect path', async () => {
        const data: AuthSchema = {
          email: 'test@test.com',
          password: 'password',
          nextPath: routes.metricScore,
        }

        vi.mocked(createClient).mockResolvedValue({
          auth: {
            signInWithPassword: vi.fn().mockResolvedValue({
              error: null,
            }),
          },
        } as unknown as SupabaseClient)

        await login(data)

        expect(revalidatePath).toHaveBeenCalledWith(routes.home, 'layout')
        expect(redirect).toHaveBeenCalledWith(routes.metricScore)
      })
    })
  })

  describe('when user enters invalid credentials', () => {
    it('return error message', async () => {
      const data: AuthSchema = {
        email: 'test@test.com',
        password: 'password',
      }

      vi.mocked(createClient).mockResolvedValue({
        auth: {
          signInWithPassword: vi.fn().mockResolvedValue({
            error: {
              message: 'Invalid credentials',
            },
          }),
        },
      } as unknown as SupabaseClient)

      const result = await login(data)

      expect(result).toEqual({
        message: 'Invalid credentials',
      })
    })
  })

  describe('when the data is invalid', () => {
    it('return field errors', async () => {
      const data: AuthSchema = {
        email: 'aaa',
        password: 'password',
      }

      const result = await login(data)

      expect(result).toEqual({
        errors: {
          email: ['Invalid email address'],
        },
      })
    })
  })
})

describe('signup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe(('when user enters valid credentials'), () => {
    it('signup successfully', async () => {
      const data: AuthSchema = {
        email: 'test@test.com',
        password: 'password',
      }

      vi.mocked(createClient).mockResolvedValue({
        auth: {
          signUp: vi.fn().mockResolvedValue({
            error: null,
          }),
        },
      } as unknown as SupabaseClient)

      await signup(data)

      expect(revalidatePath).toHaveBeenCalledWith(routes.home, 'layout')
      expect(redirect).toHaveBeenCalledWith(routes.business)
    })
  })

  describe('when user enters invalid credentials', () => {
    it('return error message', async () => {
      const data: AuthSchema = {
        email: 'test@test.com',
        password: 'password',
      }

      vi.mocked(createClient).mockResolvedValue({
        auth: {
          signUp: vi.fn().mockResolvedValue({
            error: {
              message: 'Invalid credentials',
            },
          }),
        },
      } as unknown as SupabaseClient)

      const result = await signup(data)

      expect(result).toEqual({
        message: 'Invalid credentials',
      })
    })
  })

  describe('when the data is invalid', () => {
    it('return field errors', async () => {
      const data: AuthSchema = {
        email: 'aaa',
        password: 'password',
      }

      const result = await signup(data)

      expect(result).toEqual({
        errors: {
          email: ['Invalid email address'],
        },
      })
    })
  })
})

describe('logout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('logout successfully', async () => {
    vi.mocked(createClient).mockResolvedValue({
      auth: {
        signOut: vi.fn().mockResolvedValue({
          error: null,
        }),
      },
    } as unknown as SupabaseClient)

    await logout()

    expect(revalidatePath).toHaveBeenCalledWith(routes.home, 'layout')
    expect(redirect).toHaveBeenCalledWith(routes.home)
  })
})

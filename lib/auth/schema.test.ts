import type { AuthSchema } from './schema'
import { authSchema } from './schema'

describe('authSchema', () => {
  it('validates email and password', () => {
    const data: AuthSchema = {
      email: 'test@test.com',
      password: 'password',
    }

    const result = authSchema.safeParse(data)

    expect(result.success).toBe(true)
  })

  it('detects invalid email', () => {
    const data: AuthSchema = {
      email: 'test',
      password: 'password',
    }

    const result = authSchema.safeParse(data)

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('Invalid email address')
  })

  it('invalidates password', () => {
    const data = {
      email: 'test@test.com',
      password: '12',
    }

    const result = authSchema.safeParse(data)

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toContain('Password must be at least')
  })
})
// import { describe, expect, beforeEach, afterEach, it, vi } from 'vitest'

import { port, setEnv } from './test.util'

describe('env server validation', () => {
  const originalEnv = process.env
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.resetModules()

    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    process.env = { ...originalEnv }

    const suffixes = ['DEVELOPMENT', 'TEST', 'PRODUCTION']
    const prefixes = ['DATABASE_URL_', 'DIRECT_URL_', 'NEXT_PUBLIC_SUPABASE_URL_', 'NEXT_PUBLIC_SUPABASE_ANON_KEY_', 'SUPABASE_SERVICE_ROLE_KEY_']

    suffixes.forEach(s => {
      prefixes.forEach(p => delete process.env[`${p}${s}`])
    })

    delete process.env.APP_ENV
    delete process.env.OPENROUTER_API_KEY
    delete process.env.SUPABASE_SSL_CERT
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('validate correctly for development environment', async () => {
    setEnv('development')

    const { env } = await import('./env')

    expect(env.APP_ENV).toBe('development')
    expect(env.DATABASE_URL).toBe(`postgresql://localhost:${port.development}`)
    expect(env.DIRECT_URL).toBe(`postgresql://localhost:${port.development}`)
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe(`http://localhost:${port.development}`)
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('development-anon-key')
    expect(env.SUPABASE_SERVICE_ROLE_KEY).toBe('development-service-role-key')
    expect(env.OPENROUTER_API_KEY).toBe('api-key')
    expect(env.SUPABASE_SSL_CERT).toBe('cert')
  })

  it('validate correctly for test environment', async () => {
    setEnv('test')

    const { env } = await import('./env')

    expect(env.APP_ENV).toBe('test')
    expect(env.TEST_PORT).toBe('4000')
    expect(env.DATABASE_URL).toBe(`postgresql://localhost:${port.test}`)
    expect(env.DIRECT_URL).toBe(`postgresql://localhost:${port.test}`)
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe(`http://localhost:${port.test}`)
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('test-anon-key')
    expect(env.SUPABASE_SERVICE_ROLE_KEY).toBe('test-service-role-key')
    expect(env.OPENROUTER_API_KEY).toBe('api-key')
    expect(env.SUPABASE_SSL_CERT).toBe('cert')
  })

  it('validate correctly for production environment', async () => {
    setEnv('production')

    const { env } = await import('./env')

    expect(env.APP_ENV).toBe('production')
    expect(env.DATABASE_URL).toBe(`postgresql://localhost:${port.production}`)
    expect(env.DIRECT_URL).toBe(`postgresql://localhost:${port.production}`)
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe(`http://localhost:${port.production}`)
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('production-anon-key')
    expect(env.SUPABASE_SERVICE_ROLE_KEY).toBe('production-service-role-key')
    expect(env.OPENROUTER_API_KEY).toBe('api-key')
    expect(env.SUPABASE_SSL_CERT).toBe('cert')
  })

  describe('when required variables are missing', () => {
    it('throw error', async () => {
      setEnv('development')

      delete process.env.NEXT_PUBLIC_SUPABASE_URL_DEVELOPMENT

      await expect(import('./env')).rejects.toThrow('Invalid environment variables')
    })
  })

  describe('URL format is incorrect', () => {
    it('throw error', async () => {
      setEnv('development')
      process.env.NEXT_PUBLIC_SUPABASE_URL_DEVELOPMENT = 'not-a-url'

      await expect(import('./env')).rejects.toThrow('Invalid environment variables')
    })
  })
})

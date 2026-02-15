import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// Note: use relative paths to enable prisma to find the file
import { getFieldErrors } from '../zod/error-utils'

const envValue = z.enum(['development', 'test', 'production']).default('development')

const dynamicURL = (key: string) => z.url({
  error: `${key} is must be a valid URL`,
}).min(1, `${key} is required`)

const dynamicString = (key: string) => z.string().min(1, `${key} is required`)

const appEnv = z.object({
   APP_ENV: envValue,
}).parse(process.env)

const suffix = appEnv.APP_ENV.toUpperCase()

// Note: Map db to env
const dbUrlKey = `DATABASE_URL_${suffix}` as const
const directUrlKey = `DIRECT_URL_${suffix}` as const

const nextPublicSupabaseUrlKey = `NEXT_PUBLIC_SUPABASE_URL_${suffix}` as const
const nextPublicSupabaseAnonKey = `NEXT_PUBLIC_SUPABASE_ANON_KEY_${suffix}` as const
const supabaseServiceRoleKey = `SUPABASE_SERVICE_ROLE_KEY_${suffix}` as const

export const env = createEnv({
  server: {
    APP_ENV: envValue,
    DATABASE_URL: dynamicURL(dbUrlKey),
    DIRECT_URL: dynamicURL(directUrlKey),

    OPENROUTER_API_KEY: z.string(),
    SUPABASE_SSL_CERT: z.string(),

    SUPABASE_SERVICE_ROLE_KEY: dynamicString(supabaseServiceRoleKey)
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: dynamicURL(nextPublicSupabaseUrlKey),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: dynamicString(nextPublicSupabaseAnonKey),
  },
  runtimeEnv: {
    APP_ENV: appEnv.APP_ENV,
    DATABASE_URL: process.env[dbUrlKey],
    DIRECT_URL: process.env[directUrlKey],

    NEXT_PUBLIC_SUPABASE_URL: process.env[nextPublicSupabaseUrlKey],
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env[nextPublicSupabaseAnonKey],
    SUPABASE_SERVICE_ROLE_KEY: process.env[supabaseServiceRoleKey],

    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    SUPABASE_SSL_CERT: process.env.SUPABASE_SSL_CERT,
  },
  onValidationError: error => {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', getFieldErrors(error))
    } else {
      console.error('❌ Invalid environment variables:', error)
    }
    throw new Error('Invalid environment variables')
  },
  onInvalidAccess: variable => {
    throw new Error(`❌ Attempted to access a restricted environment variable: ${variable}`)
  },
})

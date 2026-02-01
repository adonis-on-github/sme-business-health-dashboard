import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const appEnv = z.object({
   APP_ENV: z.enum(['development', 'test', 'production']).default('development'),
}).parse(process.env)

const suffix = appEnv.APP_ENV.toUpperCase()

// Note: Map db to env
const dbUrlKey = `DATABASE_URL_${suffix}` as const
const directUrlKey = `DIRECT_URL_${suffix}` as const

export const env = createEnv({
  server: {
    APP_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.url({
      message: `${dbUrlKey} is required`,
    }),

    DIRECT_URL: z.url({
      message: `${directUrlKey} is required`,
    }),

    TEST_AUTH_BYPASS_KEY: z.string().optional(),

    OPENROUTER_API_KEY: z.string(),
    SUPABASE_SSL_CERT: z.string(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },
  runtimeEnv: {
    APP_ENV: appEnv.APP_ENV,
    DATABASE_URL: process.env[dbUrlKey],
    DIRECT_URL: process.env[directUrlKey],

    TEST_AUTH_BYPASS_KEY: process.env.TEST_AUTH_BYPASS_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    SUPABASE_SSL_CERT: process.env.SUPABASE_SSL_CERT,
  }
})

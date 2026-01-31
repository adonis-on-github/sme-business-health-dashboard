import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

/**
 * rawEnv is used to store all environment variables and
 * to enable mapping to different environments
 */
const rawEnv = createEnv({
    server: {
        APP_ENV: z.enum(['development', 'production', 'test']).default('development'),

        DATABASE_URL_DEVELOPMENT: z.url(),
        DATABASE_URL_PRODUCTION: z.url(),
        DATABASE_URL_TEST: z.url(),

        DIRECT_URL_DEVELOPMENT: z.url(),
        DIRECT_URL_PRODUCTION: z.url(),
        DIRECT_URL_TEST: z.url(),

        OPENROUTER_API_KEY: z.string(),

        SUPABASE_SSL_CERT: z.string(),

        TEST_AUTH_BYPASS_KEY: z.string(),
    },

    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.url(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    },

    runtimeEnv: {
        APP_ENV: process.env.APP_ENV,

        DATABASE_URL_DEVELOPMENT: process.env.DATABASE_URL_DEVELOPMENT,
        DATABASE_URL_TEST: process.env.DATABASE_URL_TEST,
        DATABASE_URL_PRODUCTION: process.env.DATABASE_URL_PRODUCTION,

        DIRECT_URL_DEVELOPMENT: process.env.DIRECT_URL_DEVELOPMENT,
        DIRECT_URL_TEST: process.env.DIRECT_URL_TEST,
        DIRECT_URL_PRODUCTION: process.env.DIRECT_URL_PRODUCTION,

        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,

        SUPABASE_SSL_CERT: process.env.SUPABASE_SSL_CERT,

        TEST_AUTH_BYPASS_KEY: process.env.TEST_AUTH_BYPASS_KEY,
    },

    emptyStringAsUndefined: true,
})

/**
 * Resolve environment variables based on the current environment
 * @param prefix - The prefix of the environment variable
 * @returns The resolved environment variable, if the prefix is not found in rawEnv,
 * it will try to find it in the environment variables
 */
const resolve = (prefix: string): string | undefined => {
    if (prefix in rawEnv) {
        return rawEnv[prefix as keyof typeof rawEnv]
    }

    const envName = rawEnv.APP_ENV.toUpperCase()

    const key = `${prefix}_${envName}` as keyof typeof rawEnv

    if (!(key in rawEnv)) {
        throw new Error(`resolve(): Missing value for ${key as string}`)
    }

    const value = rawEnv[key]

    return value
}

export const env = {
    APP_ENV: rawEnv.APP_ENV,
    DATABASE_URL: resolve('DATABASE_URL'),
    DIRECT_URL: resolve('DIRECT_URL'),
    NEXT_PUBLIC_SUPABASE_URL: resolve('NEXT_PUBLIC_SUPABASE_URL'),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: resolve('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    OPENROUTER_API_KEY: resolve('OPENROUTER_API_KEY'),
    SUPABASE_SSL_CERT: resolve('SUPABASE_SSL_CERT'),
    TEST_AUTH_BYPASS_KEY: resolve('TEST_AUTH_BYPASS_KEY'),
} as const


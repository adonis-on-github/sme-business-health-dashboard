import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const appEnv = z.object({
   APP_ENV: z.enum(['development', 'test', 'production']).default('development'),
}).parse(process.env)

const shared = {
    OPENROUTER_API_KEY: z.string(),
    SUPABASE_SSL_CERT: z.string(),
}

const developmentSchema = {
    server: {
        DATABASE_URL_DEVELOPMENT: z.url(),
        DIRECT_URL_DEVELOPMENT: z.url(),
        ...shared
    },
    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.url(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    },
    runtimeEnv: {
        DATABASE_URL_DEVELOPMENT: process.env.DATABASE_URL_DEVELOPMENT,
        DIRECT_URL_DEVELOPMENT: process.env.DIRECT_URL_DEVELOPMENT,

        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,

        SUPABASE_SSL_CERT: process.env.SUPABASE_SSL_CERT,
    }
}

const testSchema = {
    server: {
        DATABASE_URL_TEST: z.url(),
        DIRECT_URL_TEST: z.url(),
        TEST_AUTH_BYPASS_KEY: z.string(),
        ...shared
    },
    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.url(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    },
    runtimeEnv: {
        DATABASE_URL_TEST: process.env.DATABASE_URL_TEST,
        DIRECT_URL_TEST: process.env.DIRECT_URL_TEST,

        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,

        SUPABASE_SSL_CERT: process.env.SUPABASE_SSL_CERT,

        TEST_AUTH_BYPASS_KEY: process.env.TEST_AUTH_BYPASS_KEY
    }
}

const productionSchema = {
    server: {
        DATABASE_URL_PRODUCTION: z.url(),
        DIRECT_URL_PRODUCTION: z.url(),
        ...shared
    },
    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.url(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    },
    runtimeEnv: {
        DATABASE_URL_PRODUCTION: process.env.DATABASE_URL_PRODUCTION,
        DIRECT_URL_PRODUCTION: process.env.DIRECT_URL_PRODUCTION,

        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,

        SUPABASE_SSL_CERT: process.env.SUPABASE_SSL_CERT,
    }
}

const isDev = appEnv.APP_ENV === 'development'
const isTest = appEnv.APP_ENV === 'test'

/**
 * rawEnv is used to store all environment variables and
 * to enable mapping to different environments
 */
const rawEnv = isDev
    ? createEnv(developmentSchema)
    : isTest
        ? createEnv(testSchema)
        : createEnv(productionSchema)

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

    const envName = appEnv.APP_ENV.toUpperCase()

    const key = `${prefix}_${envName}` as keyof typeof rawEnv

    const value = rawEnv[key]

    return value
}

export const env = {
    APP_ENV: appEnv.APP_ENV,
    DATABASE_URL: resolve('DATABASE_URL'),
    DIRECT_URL: resolve('DIRECT_URL'),
    NEXT_PUBLIC_SUPABASE_URL: resolve('NEXT_PUBLIC_SUPABASE_URL'),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: resolve('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    OPENROUTER_API_KEY: resolve('OPENROUTER_API_KEY'),
    SUPABASE_SSL_CERT: resolve('SUPABASE_SSL_CERT'),
    TEST_AUTH_BYPASS_KEY: resolve('TEST_AUTH_BYPASS_KEY'),
} as const


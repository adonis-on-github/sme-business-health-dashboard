type Environment = 'development' | 'test' | 'production'

export const port = {
  development: 5432,
  test: 6432,
  production: 7432,
}

export const setEnv = (env: Environment) => {
  process.env.APP_ENV = env

  const dbUrlKey = `DATABASE_URL_${env.toUpperCase()}` as const
  const directUrlKey = `DIRECT_URL_${env.toUpperCase()}` as const
  const nextPublicSupabaseUrlKey = `NEXT_PUBLIC_SUPABASE_URL_${env.toUpperCase()}` as const
  const nextPublicSupabaseAnonKey = `NEXT_PUBLIC_SUPABASE_ANON_KEY_${env.toUpperCase()}` as const
  const supabaseServiceRoleKey = `SUPABASE_SERVICE_ROLE_KEY_${env.toUpperCase()}` as const

  process.env[dbUrlKey] = `postgresql://localhost:${port[env]}`
  process.env[directUrlKey] = `postgresql://localhost:${port[env]}`
  process.env[nextPublicSupabaseUrlKey] = `http://localhost:${port[env]}`
  process.env[nextPublicSupabaseAnonKey] = `${env}-anon-key`
  process.env[supabaseServiceRoleKey] = `${env}-service-role-key`

  process.env.OPENROUTER_API_KEY = 'api-key'
  process.env.SUPABASE_SSL_CERT = 'cert'
}

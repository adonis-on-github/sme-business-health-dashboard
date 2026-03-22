import type { NextConfig } from 'next'

import { env } from '@/lib/env'

const allowedDevOrigins = env.APP_ENV === 'test' 
? [
    `http://127.0.0.1:${env.TEST_PORT}`,     
    `http://localhost:${env.TEST_PORT}`, 
  ] : 
  [
    'http://127.0.0.1:3000', 
    'http://localhost:3001'
  ]

const distDir = env.APP_ENV === 'test' ? '.next-e2e' : '.next'

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  experimental: {
    testProxy: true,
  },
  allowedDevOrigins,
  env: {
    TEST_PORT: env.TEST_PORT,
  },
  distDir,
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  experimental: {
    testProxy: true,
  },
  env: {
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING ?? 'disabled',
    TEST_PORT: process.env.TEST_PORT ?? '3001',
  },
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
}

export default nextConfig

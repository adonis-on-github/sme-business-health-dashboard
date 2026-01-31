import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  experimental: {
    testProxy: true,
  },
  env: {
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING ?? 'disabled'
  },
}

export default nextConfig

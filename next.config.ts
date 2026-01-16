import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  experimental: {
    testProxy: true, // Enables server-side interception
  },
  env: {
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING ?? 'disabled'
  },
}

export default nextConfig

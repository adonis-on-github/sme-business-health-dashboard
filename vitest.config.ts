import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./**/*.test.{js,ts,jsx,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@testig-library/react': path.resolve(__dirname, './lib/testing-library/test-utils.ts'),
      'rtl-original': path.resolve(__dirname  , 'node_modules/@testing-library/react'),
    },
  },
})

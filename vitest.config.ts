import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [react()],
        test: {
          name: 'client',
          environment: 'jsdom',
          globals: true,
          include: ['./**/*.test.{js,ts,jsx,tsx}'],
          exclude: [
            './**/*.node.test.{js,ts}',
            'node_modules/**',
            './**/.next/**',
            './**/.next-e2e/'
          ],
          setupFiles: ['./vitest.client.setup.ts'],
          alias: {
            '@testig-library/react': path.resolve(__dirname, './lib/testing-library/test-utils.ts'),
            'rtl-original': path.resolve(__dirname  , 'node_modules/@testing-library/react'),
          },
        }
      },
      {
        extends: true,
        test: {
          name: 'server',
          environment: 'node',
          globals: true,
          include: ['./**/*.node.test.{js,ts}'],
          setupFiles: ['./vitest.server.setup.ts'],
        }
      }
    ]
  },
})

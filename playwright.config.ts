import { defineConfig, devices } from '@playwright/test'

import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  testDir: './e2e',
  // testMatch: ['**/*.spec.ts'],
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'x-test-bypass-key': process.env.TEST_AUTH_BYPASS_KEY ?? '',
    },
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_PUBLIC_API_MOCKING: 'enabled',
    },
  },
})
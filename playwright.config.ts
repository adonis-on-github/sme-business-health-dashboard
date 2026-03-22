// import { defineConfig, devices } from '@playwright/test'
// import { devices } from '@playwright/test'

import dotenv from 'dotenv'
import { STORAGE_STATE_PATH } from '@e2e/lib/constants'

import { defineConfig, devices } from 'next/experimental/testmode/playwright'
// Load .env.test file for test environment variables
dotenv.config({ path: '.env.test' , quiet: true })

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  globalTeardown: './e2e/global-teardown.ts',
  testMatch: ['**/*.spec.ts'],
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  fullyParallel: false,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  metadata: {
    testmode: true,
  },
  use: {
    baseURL: `http://localhost:${process.env.TEST_PORT}`,
    trace: 'on-first-retry',
    locale: 'en-US',
    extraHTTPHeaders: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
  projects: [
    {
      name: 'e2e-public',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: ['**/*.public.spec.ts'],
    },
    {
      name: 'setup',
      testMatch: ['**/auth.setup.ts'],
    },
    {
      name: 'e2e-private',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_PATH,
      },
      dependencies: ['setup'],
      testMatch: ['**/*.spec.ts'],
      testIgnore: ['**/*.public.spec.ts'],
    },
    {
      name: 'cleanup',
      testMatch: ['**/global-teardown\.ts']
    },
  ],
  webServer: [
    {
      command: `npm run dev:e2e -- --port ${process.env.TEST_PORT}`,
      url: `http://localhost:${process.env.TEST_PORT}`,
      // it should be a separate process from the dev server
      reuseExistingServer: false, // !process.env.CI,
      env: {
        NEXT_DIST_DIR: '.next-e2e',
        TEST_PORT: process.env.TEST_PORT ?? '3001',
        APP_ENV: 'test',
      },
      // Note: uncomment these lines to display MSW messages
      stdout: 'pipe',
      stderr: 'pipe',
    }
  ],
})
import  { test as base, expect, type Page } from '@playwright/test'
// import { v4 as uuid } from 'uuid'

import { EMAIL, PASSWORD, USER_METADATA_PATH } from '@e2e/lib/constants'
import { createUser, purgeUser } from '@e2e/lib/db.supabase'
import { createUserMetadata, purgeUserMetadata } from '@e2e/lib/userUtils'

type TestUser = {
  email: string
  id: string
  password: string
}

type UserWorkerFixture = {
  managedUser: TestUser
}

// TODO: Move to lib folder and update login part
export async function performLogin(page: Page, email: string, password: string) {
  await page.goto('/login')
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')

  // Ensure login was successful before proceeding
  await page.waitForURL('**/dashboard')
  // Optional: verify a specific element exists on the dashboard
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const test = base.extend<{}, UserWorkerFixture>({
  managedUser: [
    async ({ browser }, use) => {
      // Note: For future optimizations
      // const uniqueId = uuid()
      // const email = `test-${uniqueId}@test.com`

      const email =  EMAIL

      console.log(`👷 Worker starting with unique user: ${email}`)

      const { user } = await createUser(email)

      const context = await browser.newContext()
      const page = await context.newPage()

      try {
        await performLogin(page, email, PASSWORD)

        await context.storageState({ path: USER_METADATA_PATH })
      } finally {
        await context.close()
      }

      await createUserMetadata(user.id)

      await use({
        email,
        password: PASSWORD,
        id: user.id,
      })

      console.log(`🧹 Worker finishing: Purging ${email}`)

      await purgeUser(email)
      await purgeUserMetadata()
    },
    { scope: 'worker', auto: true }
  ]
})


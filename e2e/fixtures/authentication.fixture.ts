import { test as base } from '@playwright/test'
import { getUserMetadata } from '../lib/userUtils'

export type AuthenticationFixtures = {
  userId: string
}

export const authenticationTest = base.extend<AuthenticationFixtures>({
  userId: async ({ }, use) => {
    try {
      const { userId } = await getUserMetadata()

      await use(userId)
    } catch (error) {
      console.error('Failed to get userId. Ensure "setup" project has been run successfully.', error)

      throw error
    }
  }
})
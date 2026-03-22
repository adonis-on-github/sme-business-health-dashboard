import { test as base, expect } from 'next/experimental/testmode/playwright'

import { routes } from '@/lib/routes'

import { DataContextService } from '@e2e/lib/DataContextService'
import { getUserMetadata } from '@e2e/lib/userUtils'
import { BusinessPage } from '@e2e/pages/business.page'

type TestFixture = {
  userId: string
  dataContextService: DataContextService
  businessPage: BusinessPage
}

const test = base.extend<TestFixture>({
  userId: async ({ }, use) => {
    try {
      const { userId } = await getUserMetadata()

      await use(userId)
    } catch (error) {
      console.error('Failed to get userId. Ensure "setup" project has been run successfully.', error)

      throw error
    }
  },

  dataContextService: async ({ userId }, use) => {
    const dataContextService = new DataContextService(userId)

    await use(dataContextService)
    await dataContextService.cleanup()
  },

  businessPage: async ({ page, userId, dataContextService: _ }, use) => {
    await use(new BusinessPage(page, routes.business, userId))
    
  },
  
})

export { test, expect }
import { test as base, expect } from 'next/experimental/testmode/playwright'

import { routes } from '@/lib/routes'

import { DataContextService } from '@e2e/lib/DataContextService'
import { getUserMetadata } from '@e2e/lib/userUtils'
import { BusinessPage } from '@e2e/pages/business.page'
import { CreateMetricPage } from '@e2e/pages/createMetric.page'
import { ExplanationsPage } from '@e2e/pages/explanations.page'
import { ScorePage } from '@e2e/pages/score.page'

type TestFixture = {
  userId: string
  dataContextService: DataContextService
  businessPage: BusinessPage
  createMetricPage: CreateMetricPage
  scorePage: ScorePage
  explanationsPage: ExplanationsPage
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
  
  createMetricPage: async ({ page, userId, dataContextService: _ }, use) => {
    await use(new CreateMetricPage(page, routes.createMetric, userId))
  },

  scorePage: async ({ page, userId, dataContextService: _ }, use) => {
    await use(new ScorePage(page, routes.metricScore, userId))
  },

  explanationsPage: async ({ page, userId }, use) => {
    await use(new ExplanationsPage(page, routes.explanations, userId))
  },
})

test.use({ nextOptions: { fetchLoopback: true } })

export { test, expect }
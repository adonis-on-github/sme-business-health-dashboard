import { ScorePage } from '@e2e/pages/score.page'
import { createMetricTest } from './create-metric.fixture'
import { routes } from '@/lib/routes'
import { createMetric, deleteBusinessMetrics } from '@e2e/lib/db.prisma'
import type { LatestMetric } from '@dashboard/_lib/service'

type ScoreFixture = {
  scorePage: ScorePage
  latestMetric: LatestMetric
}

export const scoreTest = createMetricTest.extend<ScoreFixture>({
  latestMetric: async ({ metricMock, preCreatedBusiness }, use) => {

    const metric = await createMetric(preCreatedBusiness.businessId, metricMock, 70, 'YELLOW')

    const latestMetric: LatestMetric = {
      ...metric,
      businessName: preCreatedBusiness.name,
      type: preCreatedBusiness.type,
      city: preCreatedBusiness.city,
      currency: preCreatedBusiness.currency,
    }

    await use(latestMetric)

    await deleteBusinessMetrics(preCreatedBusiness.businessId)
  },

  scorePage: async ({ page, userId }, use) => {
    await use(new ScorePage(page, routes.metricScore, userId))
  }
})
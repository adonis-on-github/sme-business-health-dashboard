import { expect } from '@playwright/test'

import type { MetricInput } from '@dashboard/create-metric/_lib/schema'

import { routes } from '@/lib/routes'
import { businessTest } from './business.fixture'

import { CreateMetricPage } from '@e2e/pages/createMetric.page'

import {
  deleteBusinessMetrics,
  metricInspector
} from '@e2e/lib/db.prisma'

type CreateMetricFixture = {
  metricMock: MetricInput
  assertMetricAndCleanup: () => Promise<void>
  createMetricPage: CreateMetricPage
}

export const createMetricTest = businessTest.extend<CreateMetricFixture>({
  metricMock: async ({ }, use) => {
    const metricMock: MetricInput = {
      revenue: 2000,
      expenses: 1000,
      cashInBank: 500,
      topCustomerPct: 50
    }

    await use(metricMock)
  },

  assertMetricAndCleanup: async ({ preCreatedBusiness, metricMock }, use) => {
    await use(async () => {
      const metric = await metricInspector(preCreatedBusiness.businessId)

      expect(metric).not.toBeNull()

      expect(metric?.revenue).toEqual(metricMock.revenue)
      expect(metric?.expenses).toEqual(metricMock.expenses)
      expect(metric?.cashInBank).toEqual(metricMock.cashInBank)
      expect(metric?.topCustomerPct).toEqual(metricMock.topCustomerPct)
    })

    await deleteBusinessMetrics(preCreatedBusiness.businessId)
  },

  createMetricPage: async ({ page, userId }, use) => {
    await use(new CreateMetricPage(page, routes.createMetric, userId))
  }
})

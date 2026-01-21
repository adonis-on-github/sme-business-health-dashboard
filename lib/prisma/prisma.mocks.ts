import type { Business, Metric } from '@prisma/client'
import type { ExtendedMetric } from './types'
import { Decimal } from '@prisma/client/runtime/client'

export const businessMock: Business = {
  id: '1',
  userId: '1',
  name: 'Test Business',
  city: 'Test City',
  currency: 'Test Currency',
  type: 'Retail',
  salesRange: '100k-500k',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
}

export const metricMock: NonNullable<ExtendedMetric> = {
  id: '1',
  businessId: '1',
  revenue: 1000,
  expenses: 500,
  cashInBank: 500,
  topCustomerPct: 10,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
  score: 1,
  aiStatus: 'NOT_GENERATED',
  aiExplanation: null,
}
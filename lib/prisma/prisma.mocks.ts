import type { Business, LLMExplanation } from '@prisma/client'
import type { ExtendedMetric } from './types'

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
  scoreStatus: 'GREEN',
  score: 1,
}

export const llmExplanationMock: LLMExplanation = {
  id: '1',
  metricId: '1',
  llmStatus: 'GENERATED',
  error: null,
  explanationMarkdown: 'Explanation',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
}

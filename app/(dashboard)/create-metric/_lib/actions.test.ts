import { getUser } from '@/lib/supabase/server'
import prisma from '@/lib/prisma/client'
import { userMock } from '@/lib/supabase/supabase.mocks'
import { businessMock, metricMock } from '@/lib/prisma/prisma.mocks'
import { metricHealthScore, metricScoreStatus } from '@/lib/health-score/healthScore'

import { createMetric } from './actions'
import type { BusinessMetric } from './schema'

export const metricDataMock: BusinessMetric = {
  revenue: 100,
  expenses: 50,
  cashInBank: 50,
  topCustomerPct: 50
}

vi.mock('@/lib/supabase/server', () => ({
  getUser: vi.fn(),
}))

vi.mock('@/lib/prisma/client', () => ({
  default: {
      metric: {
        create: vi.fn(),
      },
      business: {
        findUnique: vi.fn(),
      }
    }
}))

vi.mock('@/lib/health-score/healthScore', () => ({
  metricHealthScore: vi.fn(),
  metricScoreStatus: vi.fn(),
}))

describe('createMetric', () => {
  describe('when user is not authenticated', () => {
    it('return an error', async () => {
      const businessId = '1'

      vi.mocked(getUser).mockResolvedValue(null)

      const result = await createMetric(businessId, metricDataMock)

      expect(result).toEqual(expect.objectContaining({
        success: false,
        message: 'User must be authenticated'
      }))
    })
  })

  describe('when business is not found', () => {
    it('return an error', async () => {
      const businessId = '1'

      vi.mocked(getUser).mockResolvedValue(userMock)
      vi.mocked(prisma.business.findUnique).mockResolvedValue(null)

      const result = await createMetric(businessId, metricDataMock)

      expect(result).toEqual(expect.objectContaining({
        success: false,
        message: 'Business not found'
      }))
    })
  })

  describe('when the input is invalid', () => {
    it('return an error with the message in the correct field', async () => {
      const businessId = '1'

      vi.mocked(getUser).mockResolvedValue(userMock)
      vi.mocked(prisma.business.findUnique).mockResolvedValue(businessMock)
      vi.mocked(prisma.metric.create).mockResolvedValue(metricMock)
      vi.mocked(metricHealthScore).mockReturnValue(1)

      const result = await createMetric(businessId, {
        ...metricDataMock,
        revenue: -1
      })

      expect(result).toEqual(expect.objectContaining({
        success: false,
        message: 'Please check the highlighted fields',
        errors: expect.objectContaining({
          revenue: ['Revenue must be a positive number']
        })
      }))
    })
  })

  it('create metric successfully', async () => {
    const businessId = '1'
    const score = 80
    const scoreStatus = 'GREEN'

    vi.mocked(getUser).mockResolvedValue(userMock)
    vi.mocked(prisma.business.findUnique).mockResolvedValue(businessMock)
    vi.mocked(prisma.metric.create).mockResolvedValue(metricMock)
    vi.mocked(metricHealthScore).mockReturnValue(score)
    vi.mocked(metricScoreStatus).mockReturnValue('GREEN')

    const result = await createMetric(businessId, metricDataMock)

    expect(prisma.metric.create).toHaveBeenCalledWith({
      data: {
        businessId,
        revenue: metricDataMock.revenue,
        expenses: metricDataMock.expenses,
        cashInBank: metricDataMock.cashInBank,
        topCustomerPct: metricDataMock.topCustomerPct,
        score,
        scoreStatus
      }
    })

    expect(result).toEqual(expect.objectContaining({
      success: true,
      message: 'Metric created successfully'
    }))
  })
})
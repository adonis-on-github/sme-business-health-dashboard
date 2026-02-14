import { redirect } from 'next/navigation'

import type { ExtendedBusiness } from '@lib/prisma/types'

import { getLatestMetric } from './service'
import { getUser } from '@/lib/supabase/server'
import prisma from '@/lib/prisma/client'
import { routes } from '@/lib/routes'

import { userMock } from '@lib/supabase/supabase.mocks'
import { businessMock, metricMock } from '@lib/prisma/prisma.mocks'

vi.mock('react', () => ({
  cache: <T>(fn: T) => fn,
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('@/lib/supabase/server', () => ({
  getUser: vi.fn(),
}))

vi.mock('@/lib/prisma/client', () => ({
  default: {
    business: {
      findUnique: vi.fn(),
    },
  },
}))

describe('getLatestMetric', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects to login if user is not authenticated', async () => {
    vi.mocked(getUser).mockResolvedValue(null)

    await getLatestMetric()

    expect(redirect).toHaveBeenCalledWith(routes.login)
  })

  it('redirects to business setup if business is not found', async () => {
    vi.mocked(getUser).mockResolvedValue(userMock)
    vi.mocked(prisma.business.findUnique).mockResolvedValue(null)

    await getLatestMetric()

    expect(redirect).toHaveBeenCalledWith(routes.business)
  })

  it('redirects to create metric if business has no monthly metrics', async () => {
    vi.mocked(getUser).mockResolvedValue(userMock)

    vi.mocked(prisma.business.findUnique).mockResolvedValue({
      ...businessMock,
      monthlyMetrics: []
    } as ExtendedBusiness)

    await getLatestMetric()

    expect(redirect).toHaveBeenCalledWith(routes.createMetric)
  })

  it('returns correctly merged business and metric data on success', async () => {
    vi.mocked(getUser).mockResolvedValue(userMock)

    const mockExtendedBusiness = {
      ...businessMock,
      monthlyMetrics: [metricMock]
    } as ExtendedBusiness

    vi.mocked(prisma.business.findUnique).mockResolvedValue(mockExtendedBusiness)

    const result = await getLatestMetric()

    expect(result).toEqual({
      businessName: businessMock.name,
      type: businessMock.type,
      city: businessMock.city,
      currency: businessMock.currency,
      ...metricMock,
    })

    expect(redirect).not.toHaveBeenCalled()
  })
})

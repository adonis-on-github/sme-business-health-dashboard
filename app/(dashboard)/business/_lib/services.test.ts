
import prisma from '@/lib/prisma/client'
import { getUser } from '@/lib/supabase/server'
import { businessMock } from '@/lib/prisma/prisma.mocks'
import { userMock } from '@/lib/supabase/supabase.mocks'

import { PrismaBusinessService } from './services'

import { businessOtherValuesMock, businessValuesMock } from './schema.mocks'
import { BUSINESS_TYPES, SALES_RANGES } from './constants'
import type { IBusinessService } from './types'

vi.mock('@/lib/prisma/client', () => ({
  default: {
    business: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('@/lib/supabase/server', () => ({
  getUser: vi.fn(),
}))

let businessService: IBusinessService

describe('getBusiness', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    businessService = new PrismaBusinessService()
  })

  describe('when user is not authenticated', () => {
    it('returns null', async () => {
      vi.mocked(getUser).mockResolvedValue(null)

      const result = await businessService.getBusiness()

      expect(result).toBeNull()
    })
  })

  describe('when business is not found', () => {
    it('returns null', async () => {
      vi.mocked(getUser).mockResolvedValue(userMock)

      vi.mocked(prisma.business.findUnique).mockResolvedValue(null)

      const result = await businessService.getBusiness()

      expect(result).toBeNull()
    })
  })

  describe('when business is found', () => {
    it('returns the business', async () => {
      vi.mocked(getUser).mockResolvedValue(userMock)
      const businessType = BUSINESS_TYPES[0]
      const businessSalesRange = SALES_RANGES[0]

      vi.mocked(prisma.business.findUnique).mockResolvedValue({
        ...businessMock,
        type: businessType,
        salesRange: businessSalesRange,
      })

      const result = await businessService.getBusiness()

      expect(result).toEqual({
        ...businessValuesMock,
        type: businessType,
        salesRange: businessSalesRange,
      })
    })
  })

  describe('when business type or sales range is "Other"', () => {
    it('returns the business with custom values', async () => {
      vi.mocked(getUser).mockResolvedValue(userMock)
      const customBusinessType = 'Custom Business Type'
      const customSalesRange = 'Custom Sales Range'

      vi.mocked(prisma.business.findUnique).mockResolvedValue({
        ...businessMock,
        salesRange: customSalesRange,
        type: customBusinessType,
      })

      const result = await businessService.getBusiness()

      expect(result).toEqual({
        ...businessOtherValuesMock,
        customBusinessType,
        customSalesRange,
      })
    })
  })
})
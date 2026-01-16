import { redirect } from 'next/navigation'

import type { Business } from '@prisma/client'
import prisma from '@/lib/prisma/client'
import { getUser } from '@/lib/supabase/server'
import { userMock } from '@/lib/supabase/supabase.mocks'

import { createBusiness } from './actions'

import { businessValuesMock, businessOtherValuesMock } from './schema.mocks'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('@/lib/prisma/client', () => ({
  default: {
    business: {
      upsert: vi.fn(),
    },
  },
}))

// Mock getUser
vi.mock('@/lib/supabase/server', () => ({
  getUser: vi.fn(),
}))

describe('createBusiness', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when user is not authenticated', () => {
    it('returns an error', async () => {
      vi.mocked(getUser).mockResolvedValue(null)

      const result = await createBusiness(businessValuesMock)

      expect(result).toEqual({
        success: false,
        message: 'User must be authenticated',
      })

      expect(prisma.business.upsert).not.toHaveBeenCalled()
      })
  })

  describe('when there are invalid fields', () => {
    it('returns validation errors for invalid fields', async () => {
      vi.mocked(getUser).mockResolvedValue(userMock)

      const invalidValues = { ...businessValuesMock, name: '' } // Name is required in schema

      const result = await createBusiness(invalidValues)

      expect(result.success).toBe(false)
      expect(result.message).toBe('Please check the highlighted fields')
      expect(result.errors).toBeDefined()
      expect(prisma.business.upsert).not.toHaveBeenCalled()
    })
  })

    it('successfully creates a business and redirects', async () => {
      vi.mocked(getUser).mockResolvedValue(userMock)

      vi.mocked(prisma.business.upsert).mockResolvedValue({} as Business)

    await createBusiness(businessValuesMock)

    expect(prisma.business.upsert).toHaveBeenCalledWith({
      where: { userId: userMock.id },
      update: {
        name: businessValuesMock.name,
        type: businessValuesMock.type,
        city: businessValuesMock.city,
        currency: businessValuesMock.currency,
        salesRange: businessValuesMock.salesRange,
      },
      create: {
        name: businessValuesMock.name,
        type: businessValuesMock.type,
        city: businessValuesMock.city,
        currency: businessValuesMock.currency,
        salesRange: businessValuesMock.salesRange,
        userId: userMock.id,
      },
    })

    expect(redirect).toHaveBeenCalledWith('/metrics')
    })

  describe('when business type or sales range is "Other"', () => {
    it('uses custom values instead of default ones', async () => {
    vi.mocked(getUser).mockResolvedValue(userMock)

    await createBusiness(businessOtherValuesMock)

    expect(prisma.business.upsert).toHaveBeenCalledWith(expect.objectContaining({
      update: expect.objectContaining({
        type: businessOtherValuesMock.customBusinessType,
        salesRange: businessOtherValuesMock.customSalesRange
      }),
    }))
    })
  })

  describe('when database error occurs', () => {
    it('returns an error message', async () => {
      vi.mocked(getUser).mockResolvedValue(userMock)

      vi.mocked(prisma.business.upsert).mockRejectedValue(new Error('Database connection failed'))

      const result = await createBusiness(businessValuesMock)

      expect(result).toEqual({
        success: false,
        message: 'Database connection failed',
      })
    })
  })
})

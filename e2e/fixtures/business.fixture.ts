import { expect } from '@playwright/test'

import type { BusinessFormValues } from '@dashboard/business/_lib/schema'

import { routes } from '@/lib/routes'

import { businessMock } from '@/lib/prisma/prisma.mocks'

import { BusinessPage } from '@e2e/pages/business.page'

import { authenticationTest } from './authentication.fixture'

import type { GenerateBusiness } from '@e2e/lib/db.prisma'
import {
  generateBusiness,
  deleteBusiness,
  businessInspector
} from '@e2e/lib/db.prisma'

type BusinessFixtures = {
    mockBusiness: BusinessFormValues
    assertBusinessAndCleanup: (mockBusiness: BusinessFormValues) => Promise<void>
    preCreatedBusiness: GenerateBusiness
    businessPage: BusinessPage
}

export const businessTest = authenticationTest.extend<BusinessFixtures>({
  mockBusiness: async ({}, use) => {
    const data: BusinessFormValues = {
      name: businessMock.name,
      type: businessMock.type,
      city: businessMock.city,
      currency: businessMock.currency,
      salesRange: '1000-5000', // Note: Use Other for salesRange to test custom sales range input
    }

    await use(data)
  },

  assertBusinessAndCleanup: async ({ userId }, use) => {

    await use(async (mockBusiness: BusinessFormValues) => {
      const business = await businessInspector(userId)

      expect(business).not.toBeNull()

      expect(business!.name).toEqual(mockBusiness.name)
      expect(business!.type).toEqual(mockBusiness.type)
      expect(business!.city).toEqual(mockBusiness.city)
      expect(business!.currency).toEqual(mockBusiness.currency)
      expect(business!.salesRange).toEqual(mockBusiness.salesRange)
    })

    await deleteBusiness(userId)
  },

  preCreatedBusiness: async ({ userId, mockBusiness }, use) => {
    const business = await generateBusiness(userId, mockBusiness)

    await use(business)

    await deleteBusiness(userId)
  },

  businessPage: async ({ page, userId }, use) => {
    await use(new BusinessPage(page, routes.business, userId))
  },
})
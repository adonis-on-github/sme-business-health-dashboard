import type { Business } from '@prisma/client'

import { getUserBusiness } from '@/lib/prisma/services/business'

import  type { BusinessFormValues } from './schema'
import { BUSINESS_TYPES, SALES_RANGES } from './constants'
import type { IBusinessService } from './types'

const normalizeBusinessType = (businessType: string) => {
  const type = BUSINESS_TYPES.includes(businessType) ? businessType : 'Other'

  const customBusinessType = type === 'Other' ? businessType : ''

  return { type, customBusinessType }
}

const normalizeSalesRange = (inputSalesRange: string) => {
  const salesRange = SALES_RANGES.includes(inputSalesRange) ? inputSalesRange : 'Other'

  const customSalesRange = salesRange === 'Other' ? inputSalesRange : ''

  return { salesRange, customSalesRange }
}

export class PrismaBusinessService implements IBusinessService {
  async getBusiness(): Promise<BusinessFormValues | null> {
    let userBusiness: Business | null = null

    try {
      userBusiness = await getUserBusiness()
    } catch (error) {
      console.error(error)

      return null
    }

    if (!userBusiness) {
      return null
    }

    const { name, city, currency } = userBusiness
    const { type, customBusinessType } = normalizeBusinessType(userBusiness.type)
    const { salesRange, customSalesRange } = normalizeSalesRange(userBusiness.salesRange)

    return {
      name,
      type,
      customBusinessType,
      city,
      salesRange,
      customSalesRange,
      currency
    } satisfies BusinessFormValues
  }
}

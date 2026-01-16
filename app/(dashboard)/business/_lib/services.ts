import prisma from '@/lib/prisma/client'
import { getUser } from '@/lib/supabase/server'

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
    const user = await getUser()

    if (!user) {
      return null
    }

    const result = await prisma.business.findUnique({
      where: {
        userId: user.id
      }
    })

    if (!result) {
      return null
    }

    const { name, city, currency } = result
    const { type, customBusinessType } = normalizeBusinessType(result.type)
    const { salesRange, customSalesRange } = normalizeSalesRange(result.salesRange)

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

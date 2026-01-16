import prisma from '@/db/prisma/client'
import { getUser } from '@/lib/supabase/server'

import { BUSINESS_TYPES, SALES_RANGES, type BusinessFormValues } from './schema'

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

export const getBusiness = async () => {
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
  } satisfies  BusinessFormValues
}
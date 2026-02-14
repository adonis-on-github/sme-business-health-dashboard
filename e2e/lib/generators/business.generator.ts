
import type { BusinessFormValues } from '@dashboard/business/_lib/schema'
import prisma from '@/lib/prisma/client'

export const generateBusiness = async (userId: string, values: BusinessFormValues) => {
  const { customBusinessType, customSalesRange, ...data } = values

  const businessData = {
    ...data,
    type: data.type === 'Other' ? customBusinessType! : data.type,
    salesRange: data.salesRange === 'Other' ? customSalesRange! : data.salesRange,
  }

  const business = await prisma.business.create({
    data: { ...businessData, userId }
  })

  return {
    businessId: business.id,
    ...values
  }
}

export type GenerateBusiness = BusinessFormValues & { businessId: string }

export const deleteBusiness = async (userId: string) => {
  await prisma.business.deleteMany({ where: { userId } })
}
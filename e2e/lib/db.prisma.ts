import prisma from '@/lib/prisma/client'

import type { BusinessFormValues } from '@dashboard/business/_lib/schema'

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

export const businessInspector = async (userId: string) => {
  const business = await prisma.business.findUnique({
    where: { userId },
  })

  return business
}

export const deleteBusinessMetrics = async (businessId: string) => {
  await prisma.metric.deleteMany({
    where: {
      businessId,
    },
  })
}

export const metricInspector = async (businessId: string) => {
  const metrics = await prisma.metric.findMany({
    where: {
      businessId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  })

  return metrics[0]
}
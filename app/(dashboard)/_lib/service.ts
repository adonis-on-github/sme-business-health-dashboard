import { cache } from 'react'
import prisma from '@/lib/prisma/client'
import { getUser } from '@/lib/supabase/server'

export const getLatestMetric = cache(async () => {
  const user = await getUser()

  if (user === null) {
    return null
  }

  const business = await prisma.business.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      name: true,
      currency: true,
      type: true,
      city: true,
      monthlyMetrics: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          revenue: true,
          expenses: true,
          cashInBank: true,
          topCustomerPct: true,
          score: true,
          scoreStatus: true,
          createdAt: true,
          updatedAt: true,
        },
        take: 1,
      },
    }
  })

  if (business === null) {
    return null
  }

  const { name, currency, monthlyMetrics, type, city } = business

  return {
    businessName: name,
    type,
    city,
    currency,
    ...monthlyMetrics[0]
  }
})

export type LatestMetric = Awaited<ReturnType<typeof getLatestMetric>>
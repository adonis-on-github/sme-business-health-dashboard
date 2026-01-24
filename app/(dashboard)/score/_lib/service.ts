import prisma from '@/lib/prisma/client'
import { getUser } from '@/lib/supabase/server'

export const getLatestMetric = async () => {
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
      monthlyMetrics: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          revenue: true,
          expenses: true,
          cashInBank: true,
          topCustomerPct: true,
          score: true,
          scoreStatus: true,
          createdAt: true,
          updatedAt: true,
          aiStatus: true,
          aiExplanation: true,
        },
        take: 1,
      },
    }
  })

  if (business === null) {
    return null
  }

  const { name, currency, monthlyMetrics } = business

  return {
    businessName: name,
    currency,
    ...monthlyMetrics[0]
  }
}

export type LatestMetric = Awaited<ReturnType<typeof getLatestMetric>>
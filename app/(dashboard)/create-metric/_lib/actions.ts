'use server'

import prisma from '@/lib/prisma/client'

import { getUser } from '@/lib/supabase/server'
import { getErrorMessage, getFieldErrors } from '@/lib/error-utils'

import { metricHealthScore, metricScoreStatus } from '@/lib/health-score/healthScore'
import type { CreateMetric } from './types'

import type { BusinessMetric } from './schema'
import { MetricSchema } from './schema'

export const createMetric: CreateMetric = async (businessId: string, metricData: BusinessMetric) => {
  const user = await getUser()

  if (!user) {
    return {
      success: false,
      message: 'User must be authenticated',
    }
  }

  const business = await prisma.business.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (!business) {
    return {
      success: false,
      message: 'Business not found'
    }
  }

  const validatedInput = MetricSchema.safeParse(metricData)

  if (!validatedInput.success) {
    return {
      success: false,
      message: 'Please check the highlighted fields',
      errors: getFieldErrors(validatedInput.error)
    }
  }

  const { revenue, expenses, cashInBank, topCustomerPct } = validatedInput.data
  const score = metricHealthScore(revenue, expenses, cashInBank, topCustomerPct)
  const scoreStatus = metricScoreStatus(score)

  try {
    await prisma.metric.create({
      data: {
        businessId,
        revenue,
        expenses,
        cashInBank,
        topCustomerPct,
        score,
        scoreStatus
      }
    })

    return {
      success: true,
      message: 'Metric created successfully',
    }

  } catch (error) {
      const errorMessage = getErrorMessage(error)

      console.error(errorMessage)

      return { success: false, message: errorMessage }
  }
}


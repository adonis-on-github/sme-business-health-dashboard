
import type { ScoreCoefficients } from './types'
import type { ScoreStatus } from '@prisma/client'

/**
 * Default coefficients for the business health score
 */
export const scoreCoefficients: ScoreCoefficients = {
  customerConcentration: 0.3,
  liquidity: 0.4,
  revenue: 0.3,
}

const CASH_RUNWAY_CLAMP = 12 // One year

export const normalizedProfitMargin = (revenue: number, expenses: number) => {
  if (revenue === 0) {
    return 0
  }

  const margin = (revenue - expenses) / revenue

  return Math.max(0, Math.min(margin, 1))
}

export const normalizedCashRunway = (cashInBank: number, expenses: number) => {
  if (expenses === 0) {
    // Zero expenses return 0 because it implies a suspended or erroneous state
    return 0
  }

  const runway = cashInBank / expenses

  const clamped = Math.min(runway, CASH_RUNWAY_CLAMP)

  return clamped / CASH_RUNWAY_CLAMP
}

export const normalizedCustomerConcentration = (topCustomerPct: number) => {
  const ratio = topCustomerPct / 100

  return 1 - Math.min(Math.max(ratio, 0), 1)
}

/**
 * Calculates the overall business health score
 */
export const metricHealthScore = (revenue: number, expenses: number, cashInBank: number, topCustomerPct: number): number => {
  const profit = normalizedProfitMargin(revenue, expenses) * scoreCoefficients.revenue

  const liquidity = normalizedCashRunway(cashInBank, expenses) * scoreCoefficients.liquidity

  const customerConcentration = normalizedCustomerConcentration(topCustomerPct) * scoreCoefficients.customerConcentration

  return Math.round((profit + liquidity + customerConcentration) * 100)
}

export const metricScoreStatus = (score: number): ScoreStatus  => {
  if (score >= 85) {
    return 'GREEN'
  } else if (score >= 60 && score < 85) {
    return 'YELLOW'
  }

  return 'RED'
}

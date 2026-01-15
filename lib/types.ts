import type { Metric } from '@prisma/client'

export type BusinessMetric = Pick<Metric, 'expenses' | 'revenue' | 'cashInBank' | 'topCustomerPct'>

/**
 * Coefficients for the business health score
 *
 * @property customerConcentration - Measures risk of top customer
 * @property revenue - Measures the Net Profit Margin
 * @property liquidity - Measures the burn rate of cash
 */
export type ScoreCoefficients = {
  customerConcentration: number
  liquidity: number
  revenue: number
}

/**
 * Status of the business health score
 *
 * @property Red - The business is in danger
 * @property Yellow - The business is at risk
 * @property Green - The business is healthy
 */
export type ScoreStatus = 'Red' | 'Yellow' | 'Green'
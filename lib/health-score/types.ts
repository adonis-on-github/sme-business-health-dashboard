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


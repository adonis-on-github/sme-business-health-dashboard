import type { ExtendedMetric } from '@/lib/prisma/types'
import { Decimal } from 'decimal.js'

// Pick the fields from Metric model that we want to use
type SelectedFields = 'revenue' | 'expenses' | 'cashInBank' | 'topCustomerPct'

export type BusinessMetric = Pick<NonNullable<ExtendedMetric>, SelectedFields>

import { z } from 'zod'

export const numberSchema = (fieldName: string) =>
  z.number({
    message: `${fieldName} must be a number`,
  })
    .positive(`${fieldName} must be a positive number`)
    .refine(
      value => {
        const decimalValue = new Decimal(value).mul(100)

        return decimalValue.isInteger()
      },
      `${fieldName} must have two decimal places`
  )

export const MetricSchema = z.object({
  revenue: numberSchema('Revenue'),
  expenses: numberSchema('Expenses'),
  cashInBank: numberSchema('Cash in bank'),
  topCustomerPct: numberSchema('Top customer percentage').refine(
    value => value <= 100,
    'Top customer percentage must be less than or equal to 100'
  )
}) satisfies z.ZodType<BusinessMetric>

export type MetricInput = z.infer<typeof MetricSchema>
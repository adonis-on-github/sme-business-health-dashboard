import { MetricSchema } from './schema'
import type { MetricInput } from './schema'

describe('MetricSchema', () => {
  describe.only('when input is valid', () => {
    it('parses without errors', () => {
      const metric: MetricInput = {
        revenue: 1000,
        expenses: 500,
        cashInBank: 200,
        topCustomerPct: 2.3
      }
      const result = MetricSchema.safeParse(metric)

      expect(result.success).toBe(true)
    })
  })

  describe('when value is negative', () => {
    it('provides the expected error', () => {
      const metric: MetricInput = {
        revenue: -1000,
        expenses: -500,
        cashInBank: -200,
        topCustomerPct: -50
      }
      const result = MetricSchema.safeParse(metric)

      expect(result.success).toBe(false)

      expect(result?.error?.issues.flatMap(issue => issue.message)).toEqual([
        'Revenue must be a positive number',
        'Expenses must be a positive number',
        'Cash in bank must be a positive number',
        'Top customer percentage must be a positive number'
      ])
    })
  })

  describe('when top customer percentage is greater than 100', () => {
    it('provides the expected error', () => {
      const metric: MetricInput = {
        revenue: 1000,
        expenses: 500,
        cashInBank: 200,
        topCustomerPct: 150
      }

      const result = MetricSchema.safeParse(metric)

      expect(result.success).toBe(false)

      expect(result?.error?.issues.flatMap(issue => issue.message)).toEqual([
        'Top customer percentage must be less than or equal to 100'
      ])
    })
  })

  describe('when the number of decimal places is greater than 2', () => {
    it('provides the expected error', () => {
      const metric: MetricInput = {
        revenue: 1000.123,
        expenses: 500.123,
        cashInBank: 200.123,
        topCustomerPct: 50.123
      }

      const result = MetricSchema.safeParse(metric)

      expect(result.success).toBe(false)

      expect(result?.error?.issues.flatMap(issue => issue.message)).toEqual([
        'Revenue must have two decimal places',
        'Expenses must have two decimal places',
        'Cash in bank must have two decimal places',
        'Top customer percentage must have two decimal places'
      ])
    })
  })

  describe('when the value is not a number', () => {
    it('provides the expected error', () => {
      const metric: MetricInput = {
        revenue: undefined,
        expenses: NaN,
        cashInBank: null,
        topCustomerPct: 'abc'
      } as unknown as MetricInput

      const result = MetricSchema.safeParse(metric)

      expect(result.success).toBe(false)

      expect(result?.error?.issues.flatMap(issue => issue.message)).toEqual([
        'Revenue must be a number',
        'Expenses must be a number',
        'Cash in bank must be a number',
        'Top customer percentage must be a number'
      ])
    })
  })
})
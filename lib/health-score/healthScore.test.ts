import {
  normalizedProfitMargin,
  normalizedCashRunway,
  metricHealthScore,
  metricScoreStatus,
  normalizedCustomerConcentration,
} from './healthScore'

describe('healthScore', () => {
  describe('normalizedProfitMargin', () => {
    it.each([
      {
        revenue: 100,
        expenses: 80,
        expected: 0.2
      },
      {
        revenue: 100,
        expenses: 50,
        expected: 0.5
      },
      {
        revenue: 100,
        expenses: 0,
        expected: 1
      }
    ])('calculate profit margin correctly for: revenue $revenue, expenses $expenses', ({
      revenue,
      expenses,
      expected
    }) => {
      expect(normalizedProfitMargin(revenue, expenses)).toBeCloseTo(expected)
    })

    it('handle zero revenue', () => {
      expect(normalizedProfitMargin(0, 50)).toBe(0)
    })
  })

  describe('normalizedCashRunway', () => {
    it.each([
      { cashInBank: 1000, expenses: 200, expected: 0.416 },
      { cashInBank: 500, expenses: 500, expected: 0.083 },
      { cashInBank: 0, expenses: 100, expected: 0 },
    ])('calculate cash runway correctly for: cashInBank $cashInBank, expenses $expenses', ({
      cashInBank,
      expenses,
      expected
    }) => {
      expect(normalizedCashRunway(cashInBank, expenses)).toBeCloseTo(expected)
    })

    it('handle zero expenses', () => {
      expect(normalizedCashRunway(1000, 0)).toBe(0)
    })
  })

  describe('normalizedCustomerConcentration', () => {
    it.each([
      { topCustomerPct: 10, expected: 0.9 },
      { topCustomerPct: 50, expected: 0.5 },
      { topCustomerPct: 100, expected: 0 },
    ])('calculate customer concentration correctly for: topCustomerPct $topCustomerPct', ({
      topCustomerPct,
      expected
    }) => {
      expect(normalizedCustomerConcentration(topCustomerPct)).toBeCloseTo(expected)
    })
  })

  describe('metricHealthScore', () => {
    it('calculate weighted health score correctly', () => {
      const revenue = 100
      const expenses = 50
      const cashInBank = 200
      const topCustomerPct = 10

      expect(metricHealthScore(revenue, expenses, cashInBank, topCustomerPct)).toBe(55)
    })
  })

  describe('metricScoreStatus', () => {
    it('return Green for scores >= 85', () => {
      expect(metricScoreStatus(85)).toBe('GREEN')
      expect(metricScoreStatus(90)).toBe('GREEN')
    })

    it('return Yellow for scores between 60 and 85', () => {
      expect(metricScoreStatus(60)).toBe('YELLOW')
      expect(metricScoreStatus(70)).toBe('YELLOW')
      expect(metricScoreStatus(84.9)).toBe('YELLOW')
    })

    it('return Red for scores < 60', () => {
      expect(metricScoreStatus(59.9)).toBe('RED')
      expect(metricScoreStatus(30)).toBe('RED')
      expect(metricScoreStatus(0)).toBe('RED')
    })
  })
})
import {
  normalizedProfitMargin,
  normalizedCashRunway,
  businessHealthScore,
  scoreStatus,
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

  describe('businessHealthScore', () => {
    it('calculate weighted health score correctly', () => {
      const revenue = 100
      const expenses = 50
      const cashInBank = 200
      const topCustomerPct = 10

      expect(businessHealthScore(revenue, expenses, cashInBank, topCustomerPct)).toBe(55)
    })
  })

  describe('scoreStatus', () => {
    it('return Green for scores >= 85', () => {
      expect(scoreStatus(85)).toBe('Green')
      expect(scoreStatus(90)).toBe('Green')
    })

    it('return Yellow for scores between 60 and 85', () => {
      expect(scoreStatus(60)).toBe('Yellow')
      expect(scoreStatus(70)).toBe('Yellow')
      expect(scoreStatus(84.9)).toBe('Yellow')
    })

    it('return Red for scores < 60', () => {
      expect(scoreStatus(59.9)).toBe('Red')
      expect(scoreStatus(30)).toBe('Red')
      expect(scoreStatus(0)).toBe('Red')
    })
  })
})
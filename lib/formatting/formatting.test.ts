import { formatValue, parseFormattedInput } from './formatting'

describe('formatValue', () => {
  describe('when currency is provided', () => {
    it('add currency symbol', () => {
      const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

      expect(formatValue(100, formatter)).toBe('$100.00')
    })
  })

  describe('when currency is not provided', () => {
    it('format a number', () => {
      const formatter = new Intl.NumberFormat('en-US')

      expect(formatValue(1000, formatter)).toBe('1,000')
    })
  })

  describe('when value is undefined', () => {
    it('return empty string', () => {
      const formatter = new Intl.NumberFormat('en-US')

      expect(formatValue(undefined, formatter)).toBe('')
    })
  })
})

describe('parseFormattedInput', () => {
  describe('when precision is provided', () => {
    it('removes non-numeric characters except the decimal point', () => {
      expect(parseFormattedInput('1,000.00', 2)).toBe('1000.00')
    })
  })

  describe('when maxValue is provided', () => {
    it('limits the value to maxValue', () => {
      expect(parseFormattedInput('2,000.00', 2, '1000')).toBe('1000')
    })
  })

  describe('when value contains non-numeric characters', () => {
    it('returns empty string if no digits found', () => {
      expect(parseFormattedInput('abc', 2)).toBe('')
    })
  })

  describe('when value exceeds precision', () => {
    it('trims decimal places to precision', () => {
      expect(parseFormattedInput('1,000.123', 2)).toBe('1000.12')
    })
  })

  describe('when there are multiple decimal points', () => {
    it('keeps only the first decimal point and subsequent digits', () => {
      expect(parseFormattedInput('1.2.3', 2)).toBe('1.23')
    })
  })
})
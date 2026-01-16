import { businessValuesMock } from './schema.mocks'
import { businessSchema } from './schema'

describe('businessSchema', () => {
  it('validates a correct business object', () => {
    const result = businessSchema.safeParse(businessValuesMock)

    expect(result.success).toBe(true)
  })

  describe('name', () => {
    it('is required', () => {
      const result = businessSchema.safeParse({ ...businessValuesMock, name: '' })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Business name must be at least 2 characters')
      }
    })

    it('must be at least 2 characters', () => {
      const result = businessSchema.safeParse({ ...businessValuesMock, name: 'A' })

      expect(result.success).toBe(false)
    })
  })

  describe('type', () => {
    it('is required', () => {
      const result = businessSchema.safeParse({ ...businessValuesMock, type: '' })

      expect(result.success).toBe(false)
    })

    it('accepts values from BUSINESS_TYPES', () => {
      const result = businessSchema.safeParse({ ...businessValuesMock, type: 'Services' })

      expect(result.success).toBe(true)
    })

    describe('when "Other" is selected', () => {
      it('requires customBusinessType', () => {
        const result = businessSchema.safeParse({
          ...businessValuesMock,
          type: 'Other',
          customBusinessType: ''
        })

        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0].path).toContain('customBusinessType')
          expect(result.error.issues[0].message).toBe('Please enter a custom business type')
        }
      })

      it('accepts a valid customBusinessType', () => {
        const result = businessSchema.safeParse({
          ...businessValuesMock,
          type: 'Other',
          customBusinessType: 'Tech Startup'
        })

        expect(result.success).toBe(true)
      })
    })
  })

  describe('city', () => {
    it('is required', () => {
      const result = businessSchema.safeParse({ ...businessValuesMock, city: '' })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('City is required')
      }
    })
  })

  describe('currency', () => {
    it('is required', () => {
      const result = businessSchema.safeParse({ ...businessValuesMock, currency: '' })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Currency is required')
      }
    })

    it('must be at least 3 characters', () => {
      const result = businessSchema.safeParse({ ...businessValuesMock, currency: 'US' })

      expect(result.success).toBe(false)
    })
  })

  describe('salesRange', () => {
    it('is required', () => {
      const result = businessSchema.safeParse({ ...businessValuesMock, salesRange: '' })

      expect(result.success).toBe(false)
    })

    describe('when "Other" is selected', () => {
      it('requires customSalesRange', () => {
        const result = businessSchema.safeParse({
          ...businessValuesMock,
          salesRange: 'Other',
          customSalesRange: ''
        })

        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.issues[0].path).toContain('customSalesRange')
          expect(result.error.issues[0].message).toBe('Please enter a custom sales range')
        }
      })

      it('accepts a valid customSalesRange', () => {
        const result = businessSchema.safeParse({
          ...businessValuesMock,
          salesRange: 'Other',
          customSalesRange: 'Over 10M'
        })

        expect(result.success).toBe(true)
      })
    })
  })
})

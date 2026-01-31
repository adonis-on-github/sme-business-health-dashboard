import { z } from 'zod'

import { getErrorMessage, getFieldErrors, setServerErrors } from './error-utils'

describe('error-utils', () => {
  describe('getErrorMessage', () => {
    it('extract message from Error instance', () => {
      const error = new Error('Test error message')

      expect(getErrorMessage(error)).toBe('Test error message')
    })

    it('extract message from object with message property', () => {
      const error = { message: 'Object error message' }

      expect(getErrorMessage(error)).toBe('Object error message')
    })

    it('return string when error is a string', () => {
      const error = 'String error message'

      expect(getErrorMessage(error)).toBe('String error message')
    })

    it('return default message for null', () => {
      expect(getErrorMessage(null)).toBe('An unknown error occurred')
    })

    it('return default message for undefined', () => {
      expect(getErrorMessage(undefined)).toBe('An unknown error occurred')
    })

    it('return default message for numeric error', () => {
      expect(getErrorMessage(500)).toBe('An unknown error occurred')
    })

    it('return default message for empty object', () => {
      expect(getErrorMessage({})).toBe('An unknown error occurred')
    })

    describe('when fallback message is provided', () => {
      it('return fallback message', () => {
        expect(getErrorMessage(null, 'Custom error message')).toBe('Custom error message')
      })
    })

    describe('when fallback message is not provided', () => {
      it('return default message', () => {
        expect(getErrorMessage(null)).toBe('An unknown error occurred')
      })
    })
  })

  describe('getFieldErrors', () => {
    it('map flat field errors correctly', () => {
      const schema = z.object({
        name: z.string().min(5, 'Name too short'),
        age: z.number().min(18, 'Must be adult'),
      })

      const result = schema.safeParse({ name: 'abc', age: 10 })

      if (result.success) {
        throw new Error('Schema should have failed')
      }

      const errors = getFieldErrors(result.error)

      expect(errors).toEqual({
        name: ['Name too short'],
        age: ['Must be adult'],
      })
    })

    it('map nested field errors with dot notation', () => {
      const schema = z.object({
        user: z.object({
          profile: z.object({
            bio: z.string().min(10, 'Bio too short'),
          }),
        }),
      })

      const result = schema.safeParse({ user: { profile: { bio: 'short' } } })

      if (result.success) {
        throw new Error('Schema should have failed')
      }

      const errors = getFieldErrors(result.error)

      expect(errors).toEqual({
        'user.profile.bio': ['Bio too short'],
      })
    })

    it('collect multiple errors for the same field', () => {
      const schema = z.object({
        password: z.string()
          .min(8, 'Too short')
          .regex(/[A-Z]/, 'Must contain uppercase')
          .regex(/[0-9]/, 'Must contain number'),
      })

      const result = schema.safeParse({ password: 'abc' })

      if (result.success) {
        throw new Error('Schema should have failed')
      }

      const errors = getFieldErrors(result.error)

      expect(errors.password).toHaveLength(3)
      expect(errors.password).toContain('Too short')
      expect(errors.password).toContain('Must contain uppercase')
      expect(errors.password).toContain('Must contain number')
    })
  })

  describe('setServerErrors', () => {
    it('call setError for each field with the first message', () => {
      const errors = {
        email: ['Invalid email', 'Already taken'],
        password: ['Too short'],
      }

      const setError = vi.fn()

      setServerErrors(errors, setError)

      expect(setError).toHaveBeenCalledTimes(2)
      expect(setError).toHaveBeenCalledWith('email', {
        type: 'server',
        message: 'Invalid email',
      })

      expect(setError).toHaveBeenCalledWith('password', {
        type: 'server',
        message: 'Too short',
      })
    })
  })
})

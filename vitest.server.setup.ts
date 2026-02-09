import { afterEach, beforeEach, afterAll, beforeAll, vi } from 'vitest'

beforeEach(() => {
  vi.resetModules()
})

beforeAll(() => {
  vi.useFakeTimers()
})

afterAll(() => {
  vi.useRealTimers()
})

afterEach(() => {
  vi.resetAllMocks()
})


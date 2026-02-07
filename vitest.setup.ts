import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

globalThis.userEvent = userEvent

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
  vi.useRealTimers()
})


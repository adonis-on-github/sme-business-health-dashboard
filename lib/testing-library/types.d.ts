import 'rtl-original'
import type { userEvent } from '@testing-library/user-event'

type UserEvent = typeof userEvent

declare global {
  var userEvent: UserEvent
}

export {}

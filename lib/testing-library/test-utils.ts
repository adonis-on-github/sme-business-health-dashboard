//Note: https://testing-library.com/docs/react-testing-library/setup#add-custom-queries

import type { ReactNode } from 'react'

// Note: This is using the original @testing-library/react types and functions
import type { Screen, RenderOptions } from 'rtl-original'

import {
  render as rtlRender,
  screen as rtlScreen,
  queries as rtlQueries,
  within as rtlWithin
} from 'rtl-original'

import { slotQueries } from './slot-queries'

export const queries = {
  ...rtlQueries,
  ...slotQueries
}

export type CustomScreen = Screen<typeof queries>

export const within = (container: HTMLElement) => rtlWithin(container, queries)

export const screen: Screen<typeof queries>  = {
  ...rtlScreen,
  ...within(document.body)
}

export const render = (ui: ReactNode, options?: Omit<RenderOptions, 'queries'>) =>
  rtlRender(ui, { queries,...options })

export * from 'rtl-original'


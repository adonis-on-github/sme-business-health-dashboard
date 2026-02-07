//Note: https://testing-library.com/docs/react-testing-library/setup#add-custom-queries

import type { ReactNode } from 'react'

/*
 Note: This is using the original @testing-library/react types and functions
 It adds the custom queries and re-exports screen, render and within

 In order to keep the import as @testing-library/react it used alias in vitest.config.ts and
 tsconfig.json

 This was necessary because the global sceen object is clashing with DOM window.screen and cannot be used in global scope
*/

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


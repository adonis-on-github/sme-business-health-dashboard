// Note: This is using the original @testing-library/react types and functions
import type {
  Matcher,
  MatcherOptions
} from 'rtl-original'

import {
  queryHelpers,
  buildQueries
} from 'rtl-original'

// Note: This is a custom query for data-slot attribute used for testing shadcn/ui components
const queryAllByDataSlot = (
  container: HTMLElement,
  slot: Matcher,
  options?: MatcherOptions
) => queryHelpers.queryAllByAttribute('data-slot', container, slot, options)

const getMultipleError = (_container: Element | null, slot: string) => {
  return `Found multiple elements with data-slot of ${slot}`
}

const getMissingError = (_container: Element | null, slot: string) => {
  return `No elements found with data-slot of ${slot}`
}

const [
  queryByDataSlot,
  getAllByDataSlot,
  getByDataSlot,
  findAllByDataSlot,
  findByDataSlot
] = buildQueries(
  queryAllByDataSlot,
  getMultipleError,
  getMissingError
  )

export const slotQueries = {
  queryAllByDataSlot,
  queryByDataSlot,
  getByDataSlot,
  getAllByDataSlot,
  findAllByDataSlot,
  findByDataSlot
}


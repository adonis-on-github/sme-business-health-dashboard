import { mergeTests } from '@playwright/test'
import { businessTest } from './business.fixture'

export { expect } from '@playwright/test'

export const test = mergeTests(businessTest)
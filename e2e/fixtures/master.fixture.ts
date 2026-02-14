import { mergeTests } from '@playwright/test'
import { businessTest } from './business.fixture'
import { createMetricTest } from './create-metric.fixture'

export { expect } from '@playwright/test'

export const test = mergeTests(businessTest, createMetricTest)
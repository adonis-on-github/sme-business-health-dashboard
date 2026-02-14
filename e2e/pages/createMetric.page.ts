import type { Page, Locator } from 'playwright/test'
import { expect } from '@playwright/test'

import { BasePage } from './base.page'
import type { Route } from '@/lib/routes'

import { MetricFormTestID } from '@dashboard/create-metric/_lib/test.ids'
import type { MetricInput } from '@dashboard/create-metric/_lib/schema'

export class CreateMetricPage extends BasePage {
  constructor(
    page: Page,
    route: Route,
    userId: string,
    readonly revenue: Locator = page.getByTestId(MetricFormTestID.revenue),
    readonly revenueError: Locator = page.getByTestId(MetricFormTestID.revenueError),
    readonly expenses: Locator = page.getByTestId(MetricFormTestID.expenses),
    readonly expensesError: Locator = page.getByTestId(MetricFormTestID.expensesError),
    readonly cashInBank: Locator = page.getByTestId(MetricFormTestID.cashInBank),
    readonly cashInBankError: Locator = page.getByTestId(MetricFormTestID.cashInBankError),
    readonly topCustomerPct: Locator = page.getByTestId(MetricFormTestID.topCustomerPct),
    readonly topCustomerPctError: Locator = page.getByTestId(MetricFormTestID.topCustomerPctError),
    readonly submitButton: Locator = page.getByTestId(MetricFormTestID.button)
  ) {
      super(page, route, userId)
    }

  async fillForm(values: MetricInput) {
    await this.setInputValue(this.revenue, values.revenue)
    await this.setInputValue(this.expenses, values.expenses)
    await this.setInputValue(this.cashInBank, values.cashInBank)
    await this.setInputValue(this.topCustomerPct, values.topCustomerPct)
  }

  async submit() {
    await this.submitButton.click()
  }

  async expectErrorMessages() {
    await expect(this.revenueError).toHaveText('Revenue must be a number')
    await expect(this.expensesError).toHaveText('Expenses must be a number')
    await expect(this.cashInBankError).toHaveText('Cash in bank must be a number')
    await expect(this.topCustomerPctError).toHaveText('Top customer percentage must be a number')
  }
}
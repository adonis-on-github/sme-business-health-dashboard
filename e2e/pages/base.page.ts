import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

import { PageHeaderTestID } from '@/components/custom/page-header/test.ids'
import type { Route } from '@/lib/routes'
import { formatDate, formatNumber } from '@/lib/formatting'

export class BasePage {
  constructor(
    public readonly page: Page,
    public readonly route: Route,
    public readonly userId: string,
    readonly header: Locator = page.getByTestId(PageHeaderTestID.header),
    readonly title: Locator = page.getByTestId(PageHeaderTestID.title),
    readonly description: Locator = page.getByTestId(PageHeaderTestID.description)
  ) {}

  async goto() {
    await this.page.goto(this.route)
  }

  async setInputValue(input: Locator, value: string | number) {
    await input.fill(value.toString())
  }

  async selectOption(input: Locator, name: string) {
    await input.click()
    await this.page.getByRole('option', { name }).click()
  }

  async isCurrent() {
    return this.page.url().endsWith(this.route)
  }

  async expectHeader(title: string, description?: string) {
    await expect(this.title).toHaveText(title)

    if (description) {
      await expect(this.description).toHaveText(description)
    }
  }
  protected async expectNumber(locator: Locator, value: number) {
    await expect(locator).toContainText(value.toString())
  }

  protected async expectFormattedNumber(locator: Locator, value: number, currency?: string) {
    const options = currency ? { currency } : undefined

    const formattedNumber = formatNumber(value, options)

    await expect(locator).toContainText(formattedNumber)
  }

  protected async expectTimestamp(locator: Locator, timestamp: Date) {
    const formatted = formatDate(timestamp)

    await expect(locator).toContainText(formatted)
  }
}
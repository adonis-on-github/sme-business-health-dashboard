import type { Page, Locator } from '@playwright/test'

import { PageHeaderTestID } from '@/components/custom/page-header/test.ids'
import type { Route } from '@/lib/routes'

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

  async setInputValue(input: Locator, value: string) {
    await input.fill(value)
  }

  async selectOption(input: Locator, name: string) {
    await input.click()
    await this.page.getByRole('option', { name }).click()
  }

  async isCurrent() {
    return this.page.url().endsWith(this.route)
  }
}
import type { Locator, Page } from 'playwright/test'
import { expect } from 'playwright/test'

import { ExplanationIds } from '@dashboard/explanations/_lib/test.ids'

import { BasePage } from './base.page'

import type { Route } from '@/lib/routes'

export class ExplanationsPage extends BasePage {
  constructor(
    page: Page,
    route: Route,
    userId: string,
    readonly explanationContent: Locator = page.getByTestId(ExplanationIds.explanationContent),
    readonly explanationError: Locator = page.getByTestId(ExplanationIds.explanationError),
    readonly noExplanation: Locator = page.getByTestId(ExplanationIds.noExplanation),
    readonly generateButton: Locator = page.getByTestId(ExplanationIds.generateButton),
    readonly generatedAt: Locator = page.getByTestId(ExplanationIds.generatedAt),
  ) {
    super(page, route, userId)
  }

  async expectNoExplanation() {
    await this.expectHeader('Explanations', 'AI explanations and actions')

    await expect(this.noExplanation).toBeVisible()

    await expect(this.explanationContent).not.toBeVisible()
    await expect(this.explanationError).not.toBeVisible()
    await expect(this.generatedAt).not.toBeVisible()

    await expect(this.generateButton).toBeVisible()
  }

  async expectExplanation(explanationsMarkdown: string) {
    await this.expectHeader('Explanations', 'AI explanations and actions')

    await expect(this.explanationContent).toHaveText(explanationsMarkdown)
    await expect(this.explanationError).not.toBeVisible()
    await expect(this.noExplanation).not.toBeVisible()

    await expect(this.generatedAt).toBeVisible()
    await expect(this.generateButton).toBeVisible()
  }

  async expectError() {
    await this.expectHeader('Explanations', 'AI explanations and actions')

    await expect(this.explanationError).toBeVisible()
    await expect(this.explanationContent).not.toBeVisible()
    await expect(this.noExplanation).not.toBeVisible()

    await expect(this.generatedAt).toBeVisible()
    await expect(this.generateButton).toBeVisible()
  }

  async generate() {
    await this.generateButton.click()
  }
}
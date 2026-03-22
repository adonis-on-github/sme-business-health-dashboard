import type { Locator, Page } from 'playwright/test'
import { expect } from '@playwright/test'

import {
  ScoreDetailsTestID,
  ScoreSummaryTestID,
  ScoreTestID
} from '@dashboard/score/_lib/test.ids'

import type { Route } from '@lib/routes'
import type { LatestMetric } from '@dashboard/_lib/service'

import { BasePage } from './base.page'

export class ScorePage extends BasePage {
  constructor(
    page: Page,
    route: Route,
    userId: string,

    private readonly scoreTitle: Locator = page.getByTestId(ScoreTestID.title),
    private readonly separator: Locator = page.getByTestId(ScoreTestID.separator),
    private readonly revenue: Locator = page.getByTestId(ScoreDetailsTestID.revenue),
    private readonly expenses: Locator = page.getByTestId(ScoreDetailsTestID.expenses),
    private readonly cashInBank: Locator = page.getByTestId(ScoreDetailsTestID.cashInBank),
    private readonly topCustomerPct: Locator = page.getByTestId(ScoreDetailsTestID.topCustomerPct),
    private readonly score: Locator = page.getByTestId(ScoreSummaryTestID.score),
    private readonly scoreStatus: Locator = page.getByTestId(ScoreSummaryTestID.scoreStatus),
    private readonly timestamp: Locator = page.getByTestId(ScoreSummaryTestID.timestamp),

    private readonly scoreActionButtons: Locator = page.getByTestId(ScoreTestID.actionButtons),

  ) {
    super(page, route, userId)
  }

  async expectPageContent(latestMetric: LatestMetric) {
    await this.expectHeader('Score')

    await this.expectLatestMetric(latestMetric)

    await expect(this.separator).toBeVisible()

    await expect(this.scoreActionButtons).toBeVisible()
  }

  async actionButtons() {
    await this.scoreActionButtons.click()
  }

  private async expectLatestMetric(latestMetric: LatestMetric) {
    await expect(this.scoreTitle).toHaveText(latestMetric.businessName)

    const { currency } = latestMetric

    await this.expectFormattedNumber(this.revenue, latestMetric.revenue, currency)
    await this.expectFormattedNumber(this.expenses, latestMetric.expenses, currency)
    await this.expectFormattedNumber(this.cashInBank, latestMetric.cashInBank, currency)
    await this.expectFormattedNumber(this.topCustomerPct, latestMetric.topCustomerPct)

    await this.expectNumber(this.score, latestMetric.score)
    await expect(this.scoreStatus).toContainText(latestMetric.scoreStatus)

    await this.expectTimestamp(this.timestamp, latestMetric.updatedAt)
  }
}
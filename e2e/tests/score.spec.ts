import { routes } from '@/lib/routes'
import { test, expect } from '@e2e/fixtures'

test.describe('Score', () => {
  test('redirect to the business page when the user has no business', async ({ scorePage }) => {
    await scorePage.goto()

    await expect(scorePage.page).toHaveURL(routes.business)
  })

  test('redirect to the create metric page when the user has no metric', async ({ scorePage, preCreatedBusiness: _ }) => {
    await scorePage.goto()

    await expect(scorePage.page).toHaveURL(routes.createMetric)
  })

  test('renders the score page when the user has a business and a metric', async ({ scorePage, latestMetric }) => {
    await scorePage.goto()

    await expect(scorePage.page).toHaveURL(routes.metricScore)

    await scorePage.expectPageContent(latestMetric)
  })

  test('navigates to the explanations page when the user clicks on the "Explanations & Actions" button', async ({ scorePage, latestMetric: _ }) => {
    await scorePage.goto()

    await scorePage.actionButtons()

    await expect(scorePage.page).toHaveURL(routes.explanations)
  })
})
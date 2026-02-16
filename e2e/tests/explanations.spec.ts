
import { routes } from '@/lib/routes'
import { test, expect } from '@e2e/fixtures'

test.describe('Explanations', () => {
  test('redirect to business when the user has no businesss', async ({ explanationsPage }) => {
    await explanationsPage.goto()

    await expect(explanationsPage.page).toHaveURL(routes.business)
  })

  test('redirect to create metric when there is no metric', async ({ explanationsPage, preCreatedBusiness: _ }) => {
    await explanationsPage.goto()

    await expect(explanationsPage.page).toHaveURL(routes.createMetric)
  })

  test('renders no epxpalations page when there are no previous explanations', async ({ explanationsPage, latestMetric: _ }) => {
    await explanationsPage.goto()

    await expect(explanationsPage.page).toHaveURL(routes.explanations)

    await explanationsPage.expectNoExplanation()
  })

})
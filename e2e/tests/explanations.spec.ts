import { routes } from '@/lib/routes'
import { test, expect } from '@e2e/fixtures'

test.describe('Explanations', () => {
  test('redirect to business when the user has no business', async ({ explanationsPage }) => {
    await explanationsPage.goto()

    await expect(explanationsPage.page).toHaveURL(routes.business)
  })

  test('redirect to create metric when there is no metric', async ({ explanationsPage, dataContextService }) => {
    await dataContextService.configureBusiness().build()

    await explanationsPage.goto()

    await expect(explanationsPage.page).toHaveURL(routes.createMetric)
  })

  test('renders no explanations page when there are no previous explanations', async ({ explanationsPage, dataContextService }) => {
    await dataContextService.configureMetric().build()

    await explanationsPage.goto()

    await expect(explanationsPage.page).toHaveURL(routes.explanations)

    await explanationsPage.expectNoExplanation()
  })

  test('renders the explanations page when there are previous explanations', async ({ explanationsPage, dataContextService }) => {
    const explanationsMarkdown = 'This is a test explanation'

    await dataContextService.configureMetric().configureExplanations(explanationsMarkdown).build()

    await explanationsPage.goto()

    await expect(explanationsPage.page).toHaveURL(routes.explanations)

    await explanationsPage.expectExplanation(explanationsMarkdown)
  })

})
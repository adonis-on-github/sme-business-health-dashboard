import { metricMock } from '@/lib/prisma/prisma.mocks'
import { routes } from '@/lib/routes'
import { test, expect } from '@e2e/fixtures'

test.describe('create metric page', () => {
  test('redirects to the business page when business is not created', async ({ createMetricPage }) => {
    await createMetricPage.goto()

    await expect(createMetricPage.page).toHaveURL(routes.business)
  })
  
  test.describe('when the business is created', () => {
    test.beforeEach(async ({ dataContextService }) => {
      await dataContextService.withBusiness().build()
    })

    test.afterEach(async ({ dataContextService }) => {
      await dataContextService.cleanup()
    })

    test('renders the create metric page', async ({ createMetricPage }) => {
      await createMetricPage.goto()

      await expect(createMetricPage.page).toHaveURL(routes.createMetric)

      await createMetricPage.expectHeader('Create Metric', 'Fill in the details for the metric')
    })
  
    test('shows error messages when form is submitted with incomplete data', async ({ createMetricPage }) => {
      await createMetricPage.goto()

      await createMetricPage.submit()

      await expect(createMetricPage.page).toHaveURL(routes.createMetric)

      await createMetricPage.expectErrorMessages()
    })

    test('creates the metric and redirects to the metric score page', async ({
      createMetricPage,
      dataContextService,
    }) => {
      await createMetricPage.goto()

      await createMetricPage.fillForm(metricMock)

      await createMetricPage.submit()

      await expect(createMetricPage.page).toHaveURL(routes.metricScore)

      await dataContextService.expectMetric(metricMock)
    })
    
  })
})


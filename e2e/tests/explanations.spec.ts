import { OPENROUTER_URL } from '@/lib/openrouter/openrouter'
import { routes } from '@/lib/routes'

import { test, expect } from '@e2e/fixtures'

test.describe('Explanations', () => {

  //Note: It is necesary to mock response before the test to avoid interferences with the authentication process.
  test.beforeEach(async ({ next  }) => {
    const mockExplanation = 'Mocked explanation'

    next.onFetch(async request => {
      if (request.url.includes(OPENROUTER_URL)) {
        return new Response(JSON.stringify({
          choices: [{ message: { content: mockExplanation } }]
        }), { status: 200, headers: { 'Content-Type': 'application/json' } })
      }

      return fetch(request)
    })
    
  })

  test('redirect to business when the user has no business', async ({ explanationsPage, userId: _ }) => {
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
  
  test('generates an explanation when the user clicks on the "Generate" button', async ({ explanationsPage, dataContextService }) => {
    const mockExplanation = 'Mocked explanation'

     await dataContextService.configureExplanations(mockExplanation).build()

    await explanationsPage.goto()

    await explanationsPage.generate()

    await explanationsPage.expectExplanation(mockExplanation)

    await dataContextService.expectExplanations(mockExplanation)
  })
})


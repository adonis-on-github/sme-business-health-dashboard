import { routes } from '@/lib/routes'
import { test, expect } from '@e2e/fixtures'

test.describe('business page', () => {
  test('renders empty business page', async ({ businessPage }) => {
    await businessPage.goto()

    await businessPage.expectHeader('Business Details', 'Fill in the details of your business and location')

    await businessPage.expectInputs()

    await businessPage.expectCustomInputsWhenOtherIsSelected()
  })

  test('displays the validation errors when the form is submitted with invalid data', async ({ businessPage }) => {
    await businessPage.goto()

    await businessPage.submit()

    await businessPage.expectErrorMessages()
  })

  test('submits the form successfully', async ({ businessPage, mockBusiness, assertBusinessAndCleanup }) => {
    await businessPage.goto()

    await businessPage.fillForm(mockBusiness)

    await businessPage.submitButton.click()

    await expect(businessPage.page).toHaveURL(routes.createMetric)

    await assertBusinessAndCleanup(mockBusiness)
  })

  test('pre-populates the form with the business data', async ({ businessPage, preCreatedBusiness }) => {
    await businessPage.goto()
    await businessPage.expectFormToMatch(preCreatedBusiness)
  })
})

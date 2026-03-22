import { routes } from '@/lib/routes'
import { test, expect } from '@e2e/fixtures/test.fixture'

import { businessMock } from '@/lib/prisma/prisma.mocks'

test.describe.only('business page', () => {
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

  test('submits the form successfully', async ({ businessPage, dataContextService }) => {    
    await businessPage.goto()

    await businessPage.fillForm(businessMock)

    await businessPage.submitButton.click()
    
    await expect(businessPage.page).toHaveURL(routes.createMetric)

    // Note: this should be after url changed to allow backend to create the business
    await dataContextService.expectBusiness(businessMock)
  })
  
  test('pre-populates the form with the business data', async ({ businessPage, dataContextService }) => {
    await dataContextService.withBusiness(businessMock).build()

    await businessPage.goto()

    await businessPage.expectFormToMatch(dataContextService.BusinessValues!)
  })
  
})

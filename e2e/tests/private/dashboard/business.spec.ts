import { routes } from '@/lib/routes'
import { test, expect } from '@e2e/fixtures'

test('renders empty business page', async ({ businessPage }) => {
  await businessPage.goto()

  await expect(businessPage.header).toBeVisible()
  await expect(businessPage.title).toHaveText('Business Details')
  await expect(businessPage.description).toHaveText('Fill in the details of your business and location')

  await expect(businessPage.nameInput).toBeVisible()
  await expect(businessPage.typeInput).toBeVisible()
  await expect(businessPage.cityInput).toBeVisible()
  await expect(businessPage.currencyInput).toBeVisible()
  await expect(businessPage.salesRangeInput).toBeVisible()
  await expect(businessPage.customTypeInput).not.toBeVisible()
  await expect(businessPage.customSalesRangeInput).not.toBeVisible()
  await expect(businessPage.submitButton).toBeVisible()
})

test.describe('when the "other" option is selected', () => {
  test.beforeEach(async ({ businessPage }) => {
    await businessPage.goto()

    await businessPage.typeInput.click()
    await businessPage.page.getByRole('option', { name: 'Other' }).click()

    await businessPage.salesRangeInput.click()
    await businessPage.page.getByRole('option', { name: 'Other' }).click()
  })

  test('displays the custom type input', async ({ businessPage }) => {
    await expect(businessPage.customTypeInput).toBeVisible()
  })

  test('displays the custom sales range input', async ({ businessPage }) => {
    await expect(businessPage.customSalesRangeInput).toBeVisible()
  })
})

test.describe('when the user submits the form with invalid data', () => {
  test('displays the validation errors', async ({ businessPage }) => {
    await businessPage.goto()

    await businessPage.selectOption(businessPage.typeInput, 'Other')
    await businessPage.selectOption(businessPage.salesRangeInput, 'Other')

    await businessPage.submitButton.click()

    await expect(businessPage.nameError).toBeVisible()
    await expect(businessPage.cityError).toBeVisible()

    await expect(businessPage.customTypeError).toBeVisible()
    await expect(businessPage.customSalesRangeError).toBeVisible()

    await businessPage.nameInput.fill('Test Business')
    await expect(businessPage.nameError).not.toBeVisible()

    await businessPage.cityInput.fill('Test City')
    await expect(businessPage.cityError).not.toBeVisible()

    await businessPage.customTypeInput.fill('Test Custom Type')
    await expect(businessPage.customTypeError).not.toBeVisible()

    await businessPage.customSalesRangeInput.fill('Test Custom Sales Range')
    await expect(businessPage.customSalesRangeError).not.toBeVisible()
  })
})

test.describe('when the user submits the form with valid data', () => {
  test('submits the form successfully', async ({ businessPage, mockBusiness, assertBusinessAndCleanup }) => {
    await businessPage.goto()

    await businessPage.fillForm(mockBusiness)

    await businessPage.submitButton.click()

    await expect(businessPage.page).toHaveURL(routes.createMetric)

    await assertBusinessAndCleanup(mockBusiness)
  })
})

test.describe('when the busines is populated', () => {
  test('pre-populates the form with the business data', async ({ businessPage, preCreatedBusiness }) => {
    await businessPage.goto()
    await businessPage.expectFormToMatch(preCreatedBusiness)
  })
})

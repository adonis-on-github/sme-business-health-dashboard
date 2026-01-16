import type { Page } from '@playwright/test'

import { test, expect } from '@playwright/test'

import { BusinessFormTestID } from '@business/_lib/test.ids'
import { BUSINESS_TYPES, CURRENCIES, SALES_RANGES } from '@business/_lib/constants'
import { businessMock } from '@/lib/prisma/prisma.mocks'

import { setupActionMock } from '@/e2e/util/mock-actions'

import { BusinessTest } from '@business/_lib/test.ids'

const selectOtherOption = async (page: Page, testId: string) => {
  await page.getByTestId(testId).click()
  await page.getByRole('option', { name: 'Other' }).click()
}

test.describe('business page', () => {
  test.beforeEach(async ({ page }) => {
   await page.goto('/business')
  })

  test.describe('rendering', () => {
    test.describe('when business is not provided', () => {
      test('displays the default values', async ({ page }) => {

        await expect(page.getByTestId(BusinessFormTestID.name)).toHaveValue('')
        await expect(page.getByTestId(BusinessFormTestID.type)).toHaveText(BUSINESS_TYPES[0])
        await expect(page.getByTestId(BusinessFormTestID.city)).toHaveValue('')
        await expect(page.getByTestId(BusinessFormTestID.currency)).toHaveText(CURRENCIES[0].label)
        await expect(page.getByTestId(BusinessFormTestID.salesRange)).toHaveText(SALES_RANGES[0])

        await expect(page.getByTestId(BusinessFormTestID.customType)).not.toBeVisible()
        await expect(page.getByTestId(BusinessFormTestID.customSalesRange)).not.toBeVisible()
      })
    })

    test.describe('when business is provided', () => {
      test('displays the provided values', async ({ page }) => {
        const reset = await setupActionMock(
          page,
          BusinessTest,
          {
            ...businessMock,
            currency: 'USD',
            salesRange: 'Other',
            customSalesRange: '1000-5000',
          }
        )

        await expect(page.getByTestId(BusinessFormTestID.name)).toHaveValue(businessMock.name)
        await expect(page.getByTestId(BusinessFormTestID.type)).toHaveText(businessMock.type)
        await expect(page.getByTestId(BusinessFormTestID.city)).toHaveValue(businessMock.city)
        await expect(page.getByTestId(BusinessFormTestID.currency)).toContainText('USD')
        await expect(page.getByTestId(BusinessFormTestID.salesRange)).toHaveText('Other')

        await expect(page.getByTestId(BusinessFormTestID.customType)).not.toBeVisible()
        await expect(page.getByTestId(BusinessFormTestID.customSalesRange)).toHaveValue('1000-5000')

        await reset()
      })

    })
  })

  test.describe('form validation', () => {
    test('displays error message when fields are empty', async ({ page }) => {
      await page.getByTestId(BusinessFormTestID.name).fill('')
      await page.getByTestId(BusinessFormTestID.city).fill('')

      const button = page.getByTestId(BusinessFormTestID.button)

      await button.click()

      await expect(page.getByTestId(BusinessFormTestID.nameError)).toBeVisible()
      await expect(page.getByTestId(BusinessFormTestID.cityError)).toBeVisible()

      await page.getByTestId(BusinessFormTestID.name).fill('Test Business')
      await expect(page.getByTestId(BusinessFormTestID.nameError)).not.toBeVisible()

      await page.getByTestId(BusinessFormTestID.city).fill('Test City')
      await expect(page.getByTestId(BusinessFormTestID.cityError)).not.toBeVisible()

      await selectOtherOption(page, BusinessFormTestID.type)
      await button.click()

      await expect(page.getByTestId(BusinessFormTestID.customTypeError)).toBeVisible()

      await page.getByTestId(BusinessFormTestID.customType).fill('Test Type')
      await expect(page.getByTestId(BusinessFormTestID.customTypeError)).not.toBeVisible()

      await selectOtherOption(page, BusinessFormTestID.salesRange)
      await button.click()

      await expect(page.getByTestId(BusinessFormTestID.customSalesRangeError)).toBeVisible()

      await page.getByTestId(BusinessFormTestID.customSalesRange).fill('Test Sales Range')
      await expect(page.getByTestId(BusinessFormTestID.customSalesRangeError)).not.toBeVisible()
    })
  })

  test.describe('when "Other" is selected', () => {
    test('display custom type', async ({ page }) => {
      await selectOtherOption(page, BusinessFormTestID.type)
      await expect(page.getByTestId(BusinessFormTestID.customType)).toBeVisible()
    })

    test('display custom sales range', async ({ page }) => {
      await selectOtherOption(page, BusinessFormTestID.salesRange)
      await expect(page.getByTestId(BusinessFormTestID.customSalesRange)).toBeVisible()
    })
  })

})
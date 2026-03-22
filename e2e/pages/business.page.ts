import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

import type { BusinessFormValues } from '@dashboard/business/_lib/schema'
import { BusinessFormTestID } from '@dashboard/business/_lib/test.ids'
import { BasePage } from './base.page'

import {
  BUSINESS_TYPES,
  CURRENCIES,
  SALES_RANGES
} from '@dashboard/business/_lib/constants'
import type { Route } from '@/lib/routes'

export class BusinessPage extends BasePage {
  constructor(
    page: Page,
    route: Route,
    userId: string,
    readonly nameInput: Locator = page.getByTestId(BusinessFormTestID.name),
    readonly nameError: Locator = page.getByTestId(BusinessFormTestID.nameError),
    readonly typeInput: Locator = page.getByTestId(BusinessFormTestID.type),
    readonly cityInput: Locator = page.getByTestId(BusinessFormTestID.city),
    readonly cityError: Locator = page.getByTestId(BusinessFormTestID.cityError),
    readonly currencyInput: Locator = page.getByTestId(BusinessFormTestID.currency),
    readonly salesRangeInput: Locator = page.getByTestId(BusinessFormTestID.salesRange),
    readonly customTypeInput: Locator = page.getByTestId(BusinessFormTestID.customType),
    readonly customTypeError: Locator = page.getByTestId(BusinessFormTestID.customTypeError),
    readonly customSalesRangeInput: Locator = page.getByTestId(BusinessFormTestID.customSalesRange),
    readonly customSalesRangeError: Locator = page.getByTestId(BusinessFormTestID.customSalesRangeError),
    readonly submitButton: Locator = page.getByTestId(BusinessFormTestID.button)
  ) {
    super(page, route, userId)
  }

  async expectInputs() {
    await expect(this.nameInput).toBeVisible()
    await expect(this.typeInput).toBeVisible()
    await expect(this.cityInput).toBeVisible()
    await expect(this.currencyInput).toBeVisible()
    await expect(this.salesRangeInput).toBeVisible()
    await expect(this.submitButton).toBeVisible()
  }

  async expectCustomInputsWhenOtherIsSelected() {
    await this.selectOption(this.typeInput, 'Other')
    await expect(this.customTypeInput).toBeVisible()

    await this.selectOption(this.salesRangeInput, 'Other')
    await expect(this.customSalesRangeInput).toBeVisible()

    await this.selectOption(this.typeInput, BUSINESS_TYPES[0])
    await expect(this.customTypeInput).not.toBeVisible()

    await  this.selectOption(this.salesRangeInput, SALES_RANGES[0])
    await expect(this.customSalesRangeInput).not.toBeVisible()
  }

  async expectErrorMessages() {
    await expect(this.nameError).toHaveText('Business name must be at least 2 characters')
    await expect(this.cityError).toHaveText('City is required')

    await expect(this.customTypeError).not.toBeVisible()
    await expect(this.customSalesRangeError).not.toBeVisible()

    await this.nameInput.fill('Test Business')
    await expect(this.nameError).not.toBeVisible()

    await this.cityInput.fill('Test City')
    await expect(this.cityError).not.toBeVisible()

    await this.selectOption(this.typeInput, 'Other')
    await this.submit()

    await expect(this.customTypeError).toHaveText('Please enter a custom business type')

    await this.setBusinessType('Demo')
    await expect(this.customTypeError).not.toBeVisible()

    await this.selectOption(this.salesRangeInput, 'Other')
    await this.submit()

    await expect(this.customSalesRangeError).toHaveText('Please enter a custom sales range')

    await this.setBusinessSalesRange('1000000-5000000')
    await expect(this.customSalesRangeError).not.toBeVisible()
  }

  async submit() {
    await this.submitButton.click()
  }

  async fillForm(values: BusinessFormValues) {
    await this.setInputValue(this.nameInput, values.name)

    await this.setBusinessType(values.type)

    await this.setInputValue(this.cityInput, values.city)

    await this.setBusinessSalesRange(values.salesRange)

    await this.setBusinessCurrency(values.currency)
  }

  async setBusinessType(value: string) {
    if (BUSINESS_TYPES.includes(value)) {
      await this.selectOption(this.typeInput, value)
    } else {
      await this.selectOption(this.typeInput, 'Other')
      await this.setInputValue(this.customTypeInput, value)
    }
  }

  async setBusinessSalesRange(value: string) {
    if (SALES_RANGES.includes(value)) {
      await this.selectOption(this.salesRangeInput, value)
    } else {
      await this.selectOption(this.salesRangeInput, 'Other')
      await this.setInputValue(this.customSalesRangeInput, value)
    }
  }

  async setBusinessCurrency(value: string) {
    if (!CURRENCIES.find(c => c.value === value)) {
      throw new Error(`Currency ${value} not found`)
    }

    await this.selectOption(this.currencyInput, value)
  }

  async expectFormToMatch(data: BusinessFormValues) {
    await expect(this.nameInput).toHaveValue(data.name)

    if (BUSINESS_TYPES.includes(data.type)) {
      await expect(this.typeInput).toHaveText(data.type)
    } else {
      await expect(this.typeInput).toHaveText('Other')
      await expect(this.customTypeInput).toHaveValue(data.type)
    }

    await expect(this.cityInput).toHaveValue(data.city)

    await expect(this.currencyInput).toContainText(data.currency)

    if (SALES_RANGES.includes(data.salesRange)) {
      await expect(this.salesRangeInput).toHaveText(data.salesRange)
    } else {
      await expect(this.salesRangeInput).toHaveText('Other')
      await expect(this.customSalesRangeInput).toHaveValue(data.salesRange)
    }
  }
}
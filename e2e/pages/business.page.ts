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
    testId: string,
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
    super(page, route, testId)
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
import { Page, test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the homepage', async ({ page }) => {
    await expect(page).toHaveTitle('SME Business Health Dashboard')
  })
})
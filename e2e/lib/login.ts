import type { Page } from 'playwright/test'

import { AuthFormIds } from '@auth/login/_lib/test.ids'
import { routes } from '@/lib/routes'
import { EMAIL, PASSWORD } from './constants'

export const performLogin = async (page: Page, email: string = EMAIL, password: string = PASSWORD)  => {
  await page.goto(routes.login)
  await page.waitForLoadState('networkidle')

  await page.getByTestId(AuthFormIds.email).waitFor({ state: 'visible' })

  await page.getByTestId(AuthFormIds.email).fill(email)
  await page.getByTestId(AuthFormIds.password).fill(password)

  await Promise.all([
    page.getByTestId(AuthFormIds.login).click(),
    page.waitForURL(routes.business)
  ])
}
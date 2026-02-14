import { test as setup } from '@playwright/test'

import { routes } from '@/lib/routes'
import { AuthFormIds } from '@auth/login/_lib/test.ids'
import { STORAGE_STATE_PATH } from '@e2e/lib/constants'
import { createUserMetadata } from '@e2e/lib/userUtils'
import { createUser } from '@e2e/lib/db.supabase'

setup('login', async ({ page }) => {
  const credentials = await createUser()

  await createUserMetadata(credentials.user.id)

  await page.goto(routes.login)
  await page.waitForLoadState('networkidle')

  await page.getByTestId(AuthFormIds.email).waitFor({ state: 'visible' })

  await page.getByTestId(AuthFormIds.email).fill(credentials.email)
  await page.getByTestId(AuthFormIds.password).fill(credentials.password)

  await Promise.all([
    page.getByTestId(AuthFormIds.login).click(),
    page.waitForURL(routes.business)
  ])

  await page.context().storageState({ path: STORAGE_STATE_PATH })
})
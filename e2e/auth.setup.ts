import {
  test as setup,
} from 'next/experimental/testmode/playwright'

import { STORAGE_STATE_PATH } from '@e2e/lib/constants'
import { createUserMetadata } from '@e2e/lib/userUtils'
import { createUser, purgeUser } from '@e2e/lib/db.supabase'
import { performLogin } from './lib/login'

setup('login', async ({ page }) => {
  await purgeUser()

  const credentials = await createUser()

  await createUserMetadata(credentials.user.id)

  await performLogin(page)

  await page.context().storageState({ path: STORAGE_STATE_PATH })
})

import { purgeUserMetadata } from '@e2e/lib/userUtils'
import { purgeUser } from '@e2e/lib/db.supabase'

const globalTeardown = async () => {
  await purgeUserMetadata()
  await purgeUser()
}

export default globalTeardown


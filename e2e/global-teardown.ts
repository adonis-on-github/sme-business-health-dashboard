import { purgeUserMetadata } from '@e2e/lib/userUtils'
import { purgeUser } from '@e2e/lib/db.supabase'

const globalTeardown = async () => {
  console.log('🧹 Starting project cleanup...')
  
  await purgeUser()
  await purgeUserMetadata()

  console.log('✅ Cleanup complete.')
}

export default globalTeardown


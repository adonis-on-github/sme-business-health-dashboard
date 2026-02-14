import { purgeUser } from '@e2e/lib/generators/user.generator'
import { purgeUserMetadata } from '@e2e/lib/userUtils'

const globalTeardown = async () => {
  await purgeUserMetadata()
  await purgeUser()
}

export default globalTeardown


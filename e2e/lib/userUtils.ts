import fs from 'fs/promises'
import { USER_METADATA_PATH } from './constants'

type UserMetadata = { userId: string }

export const createUserMetadata = async (userId: string) => {
  await fs.writeFile(USER_METADATA_PATH, JSON.stringify({ userId }))

  console.log('User metadata created')
}

export const getUserMetadata = async (): Promise<UserMetadata> => {
  const metadata = await fs.readFile(USER_METADATA_PATH, 'utf-8')

  if (!metadata) {
    throw new Error('User metadata not found')
  }

  return JSON.parse(metadata) as UserMetadata
}

export const purgeUserMetadata = async () => {
  try {
    await fs.access(USER_METADATA_PATH)
    await fs.unlink(USER_METADATA_PATH)
  } catch (error) {
    const err = error as NodeJS.ErrnoException

    if (err.code === 'ENOENT') {
      console.error('File not found nothing to purge')
    } else {
      console.error('Purge failed', err.message)
    }
  }
}
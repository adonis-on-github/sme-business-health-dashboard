import path from 'path'

export const AUTH_DIR = path.join(process.cwd(), 'playwright/.auth')
export const STORAGE_STATE_PATH = path.join(AUTH_DIR, 'storageState.json')
export const USER_METADATA_PATH = path.join(AUTH_DIR, 'user-meta.json')


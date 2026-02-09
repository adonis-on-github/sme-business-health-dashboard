import { execSync } from 'child_process'
import { env } from '@/lib/env/env'

const globalSetup = async () => {
  if (env.APP_ENV !== 'test') {
    console.error('APP_ENV must be "test" for e2e tests')
    process.exit(1)
  }

  console.log('Resetting database...')
  execSync('npx prisma migrate reset --force')
}

export default globalSetup
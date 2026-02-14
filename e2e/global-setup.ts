import { execSync } from 'child_process'
import { env } from '@/lib/env/env'

const globalSetup = async () => {
  if (env.APP_ENV !== 'test') {
    console.error('APP_ENV must be "test" for e2e tests')
    process.exit(1)
  }

  console.log('Resetting database...')

  execSync('npx prisma migrate reset --force', {
    env: {
      ...process.env,
      APP_ENV: env.APP_ENV,
      DATABASE_URL: env.DATABASE_URL
    },
    // stdio: 'inherit' // Note: Uncomment to display the output of the command
  })
}

export default globalSetup
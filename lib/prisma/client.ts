import { PrismaPg } from '@prisma/adapter-pg'
import type { Metric } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { decimalToNumber } from './middleware-conversions'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    ca: Buffer.from(process.env.SUPABASE_SSL_CERT!, 'base64').toString('utf-8')
  }
})

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter }).$extends({
    result: {
      metric: {
        ...decimalToNumber<Metric, 'revenue' | 'expenses' | 'cashInBank' | 'topCustomerPct'>([
          'revenue',
          'expenses',
          'cashInBank',
          'topCustomerPct'
        ])
      }
    }
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}

import prisma from '@/lib/prisma/client'
import { seedData } from './data'

const main = async () => {
  for (const item of seedData) {
    await prisma.business.upsert({
      where: { id: item.business.id },
      update: {
        ...item.business,
        monthlyMetrics: {
          deleteMany: {},
          create: item.metrics.map(metric => ({
            businessId: item.business.id,
            ...metric
          })),
        }
      },
      create: {
        ...item.business,
        monthlyMetrics: {
          create: item.metrics.map(metric => ({
            businessId: item.business.id,
            ...metric
          })),
        },
      }
    })
  }
}

main().then(() => {
  console.log('Seed completed successfully')
}).catch(error => {
  console.error('Error seeding data:', error)
}).finally(async () => {
  await prisma.$disconnect()
})
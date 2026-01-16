import prisma from '@/lib/prisma/client'
import { seedData } from './data'

async function main() {
  for (const item of seedData) {
    await prisma.business.upsert({
      where: { id: item.business.id },
      update: {},
      create: {
        ...item.business,
        metrics: {
          create: item.metrics,
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
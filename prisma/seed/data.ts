import type { Business } from '@prisma/client'
import type { ExtendedMetric } from '@/lib/prisma/types'

type SeedBusiness = Omit<Business, 'createdAt' | 'updatedAt' | 'currency'>

type SeedMetric = Omit<NonNullable<ExtendedMetric>, 'id' | 'createdAt' | 'updatedAt' | 'businessId'>

type SeedItem = {
  business: SeedBusiness;
  metrics: SeedMetric[];
}

export const seedData: SeedItem[] = [
  {
    business: {
      id: 'biz-green-001',
      name: 'Apex Digital Solutions',
      type: 'IT Services',
      city: 'Bangalore',
      salesRange: '10L - 25L',
      userId: 'user-green-001',
    },
    metrics: [
      {
        revenue: 1200000,
        expenses: 800000,
        cashInBank: 1500000,
        topCustomerPct: 15,
        score: 95,
        aiStatus: 'GENERATED',
        aiExplanation: 'Profitable but risky. 65% revenue from one client creates a dangerous dependency.'
      },
    ],
  },
  {
    business: {
      id: 'biz-yellow-002',
      name: 'Om Precision Tools',
      type: 'Manufacturing',
      city: 'Pune',
      salesRange: '25L - 50L',
      userId: 'user-yellow-002',
    },
    metrics: [
      {
        revenue: 3500000,
        expenses: 2800000,
        cashInBank: 3000000,
        topCustomerPct: 65,
        score: 65,
        aiStatus: 'GENERATED',
        aiExplanation: 'Profitable but risky. 65% revenue from one client creates a dangerous dependency.'
      }
    ]
  },
  {
    business: {
      id: 'biz-red-003',
      name: 'Modern Grocery Mart',
      type: 'Retail',
      city: 'Indore',
      salesRange: '5L - 10L',
      userId: 'user-red-003',
    },
    metrics: [
      {
        revenue: 600000,
        expenses: 750000,
        cashInBank: 80000,
        topCustomerPct: 5,
        score: 25,
        aiStatus: 'GENERATED',
        aiExplanation: 'Immediate action required. You are currently operating at a loss, and your cash reserves cover less than 15 days of expenses. You need to reduce fixed costs and improve collections immediately.'
      }
    ],
  },
]

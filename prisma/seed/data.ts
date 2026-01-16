import type { Business, Metric } from '@prisma/client'

type SeedBusiness = Omit<Business, 'createdAt' | 'updatedAt' | 'currency'>

type SeedMetric = Omit<Metric, 'id' | 'createdAt' | 'updatedAt' | 'businessId'>

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
        status: 'Green',
        aiExplanation: 'Your business is in excellent health. You have a strong net margin of 40% and over 2 months of runway in cash. Your low customer dependency (12%) protects you from market volatility.',
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
        status: 'Yellow',
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
        status: 'Red',
        aiExplanation: 'Immediate action required. You are currently operating at a loss, and your cash reserves cover less than 15 days of expenses. You need to reduce fixed costs and improve collections immediately.'
      }
    ],
  },
]

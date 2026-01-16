import type { Business } from '@prisma/client'

export const businessMock: Business = {
  id: '1',
  userId: '1',
  name: 'Test Business',
  city: 'Test City',
  currency: 'Test Currency',
  type: 'Retail',
  salesRange: '100k-500k',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01'),
}
import * as z from 'zod'

import type { Business } from '@prisma/client'

type BusinessSchemaInput = Pick<Business, 'name' | 'type' | 'city' | 'salesRange' | 'currency'>

export const BUSINESS_TYPES = ['Retail', 'Service', 'Manufacturing', 'SaaS', 'Other'] as const
export const SALES_RANGES = [
  'Under 50,000',
  '50,000 - 250,000',
  '250,000 - 1,000,000',
  '1M - 5M',
  'Over 5M',
] as const

export const businessSchema = z.object({
  name: z.string().min(2, 'Business name must be at least 2 characters'),
  type: z.enum(BUSINESS_TYPES, { error: 'Please select a business type' }),
  city: z.string().min(2, 'City is required'),
  currency: z.string().min(3, 'Currency is required'),
  salesRange: z.enum(SALES_RANGES, { error: 'Please select a sales range' }),
}) satisfies z.ZodType<BusinessSchemaInput>

export type BusinessFormValues = z.infer<typeof businessSchema>


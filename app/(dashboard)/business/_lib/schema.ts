import * as z from 'zod'
import type { BusinessSchemaInput } from './types'

export const BUSINESS_TYPES = [
  'Retail', 'Service', 'Manufacturing', 'SaaS', 'Other'
]

export const SALES_RANGES = [
  'Under 50,000',
  '50,000 - 250,000',
  '250,000 - 1,000,000',
  '1M - 5M',
  'Over 5M',
  'Other'
]

export const businessSchema = z.object({
  name: z.string().min(2, 'Business name must be at least 2 characters'),
  type: z.union([
    z.enum(BUSINESS_TYPES),
    z.string().min(2, 'Please enter business type')
  ]),
  customBusinessType: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  currency: z.string().min(3, 'Currency is required'),
  salesRange: z.union([
    z.enum(SALES_RANGES),
    z.string().min(2, 'Please enter sales range')
  ]),
  customSalesRange: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.salesRange === 'Other' && !data.customSalesRange) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please enter a custom sales range',
      path: ['customSalesRange']
    })
  }

  if (data.type === 'Other' && !data.customBusinessType) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please enter a custom business type',
      path: ['customBusinessType']
    })
  }
}) satisfies z.ZodType<BusinessSchemaInput>

export type BusinessFormValues = z.infer<typeof businessSchema>


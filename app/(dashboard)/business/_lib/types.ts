import type { Business } from '@prisma/client'

export type BusinessSchemaInput = Pick<Business, 'name' | 'type' | 'city' | 'salesRange' | 'currency'> & {
  customType?: string
  customSalesRange?: string
}

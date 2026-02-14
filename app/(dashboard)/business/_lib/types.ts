import type { Business } from '@prisma/client'
import type { BusinessFormValues } from './schema'

export type BusinessSchemaInput = Pick<Business, 'name' | 'type' | 'city' | 'salesRange' | 'currency'> & {
  customType?: string
  customSalesRange?: string
}

export type ActionResponse = {
  message: string;

  errors?: Partial<Record<keyof BusinessFormValues, string[]>>;
}


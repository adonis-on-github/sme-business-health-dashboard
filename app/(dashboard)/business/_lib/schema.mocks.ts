import { businessMock } from '@/lib/prisma/prisma.mocks'
import type { BusinessFormValues } from './schema'
import { SALES_RANGES } from './constants'

export const businessValuesMock:BusinessFormValues = {
  name: businessMock.name,
  city: businessMock.city,
  currency: businessMock.currency,
  type: businessMock.type,
  salesRange: SALES_RANGES[0],
  customBusinessType: '',
  customSalesRange: '',
}

export const businessOtherValuesMock:BusinessFormValues = {
  name: businessMock.name,
  city: businessMock.city,
  currency: businessMock.currency,
  type: 'Other',
  salesRange: 'Other',
  customBusinessType: businessMock.type,
  customSalesRange: businessMock.salesRange,
}

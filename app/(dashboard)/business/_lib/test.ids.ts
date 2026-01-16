import type { MockActionsIds } from '@/lib/test/types'

export const BusinessFormTestID = {
  name: 'businessForm.name',
  nameError: 'businessForm.nameError',
  type: 'businessForm.type',
  customType: 'businessForm.customBusinessType',
  customTypeError: 'businessForm.customTypeError',
  city: 'businessForm.city',
  cityError: 'businessForm.cityError',
  currency: 'businessForm.currency',
  salesRange: 'businessForm.salesRange',
  customSalesRange: 'businessForm.customSalesRange',
  customSalesRangeError: 'businessForm.customSalesRangeError',
  button: 'businessForm.submit',
} as const

export const BusinessTest: MockActionsIds = {
  setup: {
    form: 'business-setup',
    data: 'business-setup-data',
    submit: 'business-setup-submit',
  },
  reset: {
    form: 'business-reset',
    data: 'business-reset-data',
    submit: 'business-reset-submit',
  }
}
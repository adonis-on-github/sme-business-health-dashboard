import { PrismaBusinessService } from './services'
import { MockBusinessService } from './services.mocks'

export const getBusinessService = () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    return new MockBusinessService()
  }

  return new PrismaBusinessService()
}
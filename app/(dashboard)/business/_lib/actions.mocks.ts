'use server'

import { revalidatePath } from 'next/cache'
import type { BusinessFormValues } from './schema'
import { MockBusinessService } from './services.mocks'

export const setupBusinessMock = async (payload: FormData) => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    const mockData = JSON.parse(payload.get('data') as string) as BusinessFormValues | null

    MockBusinessService.setMockData(mockData)

    revalidatePath('/business')
  }
}

export const resetBusinessMock = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {

    MockBusinessService.reset()

    revalidatePath('/business')
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import type { BusinessFormValues } from './schema'
import { MockBusinessService } from './services.mocks'

export async function setupBusinessMock(payload: FormData) {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    const mockData = JSON.parse(payload.get('data') as string) as BusinessFormValues | null

    MockBusinessService.setMockData(mockData)

    revalidatePath('/business')
  }
}

export async function resetBusinessMock() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {

    MockBusinessService.reset()

    revalidatePath('/business')
  }
}

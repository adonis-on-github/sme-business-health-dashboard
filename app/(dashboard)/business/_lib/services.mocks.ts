import type { BusinessFormValues } from './schema'
import type { IBusinessService } from './types'

export class MockBusinessService implements IBusinessService {
  private static mockData: BusinessFormValues | null = null

  static setMockData(data: BusinessFormValues | null) {
    if (MockBusinessService.mockData !== null) {
      throw new Error('MockBusinessService: must reset before setting new data')
    }

    MockBusinessService.mockData = data
  }

  static reset() {
    MockBusinessService.mockData = null
  }

  async getBusiness() {
    return MockBusinessService.mockData
  }
}
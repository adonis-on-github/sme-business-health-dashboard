import { expect } from 'next/experimental/testmode/playwright'

import { businessMock } from '@/lib/prisma/prisma.mocks'
import { 
  deleteBusiness, 
  generateBusiness,
  createMetric,
  deleteBusinessMetrics,
  businessInspector,
  metricInspector
} from './db.prisma'

import type { BusinessFormValues } from '@dashboard/business/_lib/schema'
import type { MetricInput } from '@dashboard/create-metric/_lib/schema'
import type { ScoreStatus } from '@prisma/client'

const metricMock: MetricInput = {
  revenue: 2000,
  expenses: 1000,
  cashInBank: 500,
  topCustomerPct: 50
}

export class DataContextService {
  constructor(
    private readonly userId: string,
  
    private businessValues: BusinessFormValues | null = null,
    private metricValues: MetricInput | null = null,

    private business: BusinessFormValues & { businessId: string } | null = null,
    private businessInspected: boolean = false,

    private metric: MetricInput | null = null,
    private metricInspected: boolean = false,

    private score: number = 70,
    private scoreStatus: ScoreStatus = 'YELLOW',
  ) {}
  
  withBusiness(businessValues: BusinessFormValues = businessMock) {
    this.businessValues = businessValues

    return this
  }

  withMetric(metricValues: MetricInput = metricMock, score: number = 70, scoreStatus: ScoreStatus = 'YELLOW') {
    if (!this.business) {
      throw new Error('Business not found')
    }

    this.score = score
    this.scoreStatus = scoreStatus
    this.metricValues = metricValues

    return this
  }

  async expectBusiness(expected: BusinessFormValues) {

    const business = await businessInspector(this.userId)

    expect(business).not.toBeNull()
    expect(business!.name).toEqual(expected.name)
    expect(business!.type).toEqual(expected.type)
    expect(business!.city).toEqual(expected.city)
    expect(business!.currency).toEqual(expected.currency)
    expect(business!.salesRange).toEqual(expected.salesRange)

    this.businessInspected = true
  }

  async expectMetric(expected: MetricInput) {
    const metric = await metricInspector(this.business!.businessId)

    expect(metric).not.toBeNull()
    expect(metric!.revenue).toEqual(expected.revenue)
    expect(metric!.expenses).toEqual(expected.expenses)
    expect(metric!.cashInBank).toEqual(expected.cashInBank)
    expect(metric!.topCustomerPct).toEqual(expected.topCustomerPct)

    this.metricInspected = true
  }

  async build() {
    if (this.businessValues) {
      this.business = await generateBusiness(this.userId, this.businessValues)      
    }

    if (this.metricValues) {

      if (!this.business) {
        throw new Error('Business not found')
      }

      this.metric = await createMetric(this.business.businessId, this.metricValues, this.score, this.scoreStatus)
    }
    
    return {
      business: this.business,
      metric: this.metric,
      score: this.score,
      scoreStatus: this.scoreStatus
    }
  }

  async cleanup() {
    if ((this.metric || this.metricInspected) && this.business) {
      if (!this.business) {
        throw new Error('Business not found')
      }
      
      await deleteBusinessMetrics(this.business.businessId)
    }
    
    if (this.business || this.businessInspected) {
      await deleteBusiness(this.userId)
    }
  }

  get BusinessValues() {
    return this.businessValues
  }

  get MetricValues() {
    return this.metricValues
  }
}


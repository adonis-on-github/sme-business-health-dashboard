import { expect } from 'next/experimental/testmode/playwright'

import type { LatestMetric } from '@dashboard/_lib/service'

import { businessValuesMock } from '@dashboard/business/_lib/schema.mocks'
import { metricInputMock } from '@dashboard/create-metric/_lib/schema.mocks'

import { 
  deleteBusiness, 
  generateBusiness,
  createMetric,
  deleteBusinessMetrics,
  businessInspector,
  metricInspector,
  createExplanations,
  deleteExplanations,
  getExplanations
} from './db.prisma'

import type { BusinessFormValues } from '@dashboard/business/_lib/schema'
import type { MetricInput } from '@dashboard/create-metric/_lib/schema'
import type { LLMExplanation, ScoreStatus } from '@prisma/client'

export class DataContextService {
  constructor(
    private readonly userId: string,
  
    private businessValues: BusinessFormValues | null = null,
    private metricValues: MetricInput | null = null,

    private business: BusinessFormValues & { businessId: string } | null = null,
    private businessInspected: boolean = false,

    private metric: MetricInput & { id: string } | null = null,
    private metricInspected: boolean = false,

    private score: number = 70,
    private scoreStatus: ScoreStatus = 'YELLOW',

    private explanationsMarkdown: string | null = null,
    private explanations: LLMExplanation | null = null,
    private explanationsInspected: boolean = false,

  ) {}
  
  configureBusiness(businessValues: BusinessFormValues = businessValuesMock) {
    this.businessValues = businessValues

    return this
  }

  configureMetric(metricValues: MetricInput = metricInputMock, score: number = 70, scoreStatus: ScoreStatus = 'YELLOW') {
    if (!this.business) {
      this.configureBusiness()
    }

    this.score = score
    this.scoreStatus = scoreStatus
    this.metricValues = metricValues

    return this
  }

  configureExplanations(explanationsMarkdown: string) {
    if (!this.business) {
      this.configureBusiness()
    }

    if (!this.metric) {
      this.configureMetric()
    }

    this.explanationsMarkdown = explanationsMarkdown

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

  async expectExplanations(expected: string) {
    const explanations = await getExplanations(this.metric!.id)

    expect(explanations).not.toBeNull()
    expect(explanations!.explanationMarkdown).toEqual(expected)

    this.explanationsInspected = true
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

    if (this.explanationsMarkdown) {
      if (!this.metric) {
        throw new Error('Metric not found')
      }

      this.explanations = await createExplanations(this.metric.id, this.explanationsMarkdown)
    }

    return {
      business: this.business,
      metric: this.metric,
      score: this.score,
      scoreStatus: this.scoreStatus
    }
  }

  async cleanup() {
    if (this.explanations || this.explanationsInspected) {
      const metricId = this.explanations?.metricId ?? this.metric?.id

      if (!metricId) {
        throw new Error('Explanations metricId not found')
      }

      await deleteExplanations(metricId)
    }

    if ((this.metric || this.metricInspected)) {
      if (!this.business) {
        throw new Error('Business not found')
      }
      
      await deleteBusinessMetrics(this.business.businessId)
    }
    
    if (this.business || this.businessInspected) {
      await deleteBusiness(this.userId)
    }
  }

  get BusinessValues(): BusinessFormValues {
    if (!this.businessValues) {
      throw new Error('Business values not found')
    }

    return this.businessValues
  }

  get MetricValues(): MetricInput {
    if (!this.metricValues) {
      throw new Error('Metric values not found')
    }

    return this.metricValues
  }

  get LatestMetric(): LatestMetric {
    if (!this.business) {
      throw new Error('Business not found')
    }

    if (!this.metric) {
      throw new Error('Metric not found')
    }

     return {
      ...this.metric,
      businessName: this.business!.name,
      type: this.business!.type,
      city: this.business!.city,
      currency: this.business!.currency,
     } as LatestMetric
  }
}


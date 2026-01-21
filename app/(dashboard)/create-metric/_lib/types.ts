import type { BusinessMetric } from './schema'

export type CreateMetricResponse =
| {
    success: true
    message: string
  }
| {
    success: false
    message: string
    errors?: Record<string, string[]>
  }

export type CreateMetric =  (businessId: string, metricData: BusinessMetric) => Promise<CreateMetricResponse>
import type { BusinessMetric } from './schema'

export type CreateMetricResponse =
  {
    message: string
    errors?: Record<string, string[]>
  }
  | undefined

export type CreateMetric =  (businessId: string, metricData: BusinessMetric) => Promise<CreateMetricResponse>
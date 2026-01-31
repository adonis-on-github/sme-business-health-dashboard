import type { ChatGenerationParams } from '@openrouter/sdk/models'

import type { ExtendedBusiness, ExtendedMetric } from '@lib/prisma/types'

const promptSystem = {
    system: `
You are a Senior Busin ess Consultant and Financial Analyst.
Your job is to analyze a company's financial health and produce a prioritized action plan.
Use a professional, direct, and encouraging tone.
Always structure output into: Executive Summary, Key Metrics Analysis, Priority Action Items.
Do not use tables in your response.
Present all structured information using bullet lists or numbered lists only.
`
}

type MetricData =
  & Pick<NonNullable<ExtendedBusiness>, 'city' | 'type' | 'currency'>
  & Pick<NonNullable<ExtendedMetric>, 'revenue' | 'expenses' | 'cashInBank' | 'topCustomerPct' | 'scoreStatus'>

const metricTemplate = (data: MetricData): string => {
  return `
# Input Data
- **Currency**: ${data.currency}
- **Business Type**: ${data.type}
- **City**: ${data.city}
- **Monthly Revenue**: ${data.revenue}
- **Monthly Expenses**: ${data.expenses}
- **Cash in Bank**: ${data.cashInBank}
- **Top Customer %**: ${data.topCustomerPct}
- **Current Score Status**: ${data.scoreStatus}

#Instructions
1. Status Diagnosis: Briefly explain why the business is currently in ${data.scoreStatus} status based on the data.
2. Financial Ratios: Comment on the burn rate or profit margin and the runway.
3. Risk Assessment: Specifically evaluate the "Top Customer %."
4. Strategic Advice: Provide 3 actionable steps based on the ${data.scoreStatus} status.
`
}

export const buildMessages = (data: MetricData): ChatGenerationParams['messages'] => [
  { role: 'system', content: promptSystem.system },
  { role: 'user', content: metricTemplate(data) },
]
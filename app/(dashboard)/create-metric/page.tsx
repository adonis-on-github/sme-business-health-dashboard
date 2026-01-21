import type { Metadata } from 'next'

import type { Business } from '@prisma/client'

import { getUserBusiness } from '@/lib/prisma/services/business'

import { createMetric } from './_lib/actions'

import BusinessNotCreated from './_components/busines-not-created'
import CreateMetricForm from './_components/create-metric-form'
import MetricHeader from './_components/metric-header'

export const metadata: Metadata = {
  title: 'Business Health - Create Metric',
  description: 'Business Health - Create Metric For Business'
}

const MetricsPage = async () => {
  let userBusiness: Business | null = null

  try {
    userBusiness = await getUserBusiness()
  } catch (error) {
    console.error(error)
  }

  return (
    <article className='max-w-xl mx-auto py-10 px-4'>
      <MetricHeader />

      {!userBusiness ? (
        <BusinessNotCreated />
      ) : (
        <CreateMetricForm
          businessId={userBusiness.id}
          onCreateMetric={createMetric}
          currency={userBusiness.currency}
        />
      )}
    </article >
  )
}

export default MetricsPage
import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import type { Business } from '@prisma/client'

import { routes } from '@/lib/routes'
import { getUserBusiness } from '@/lib/prisma/services'

import { createMetric } from './_lib/actions'

import CreateMetricForm from './_components/create-metric-form'
import PageHeader from '@/components/custom/page-header'

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

  if (!userBusiness) {
    return redirect(routes.business)
  }

  return (
    <article className='max-w-xl mx-auto py-10 px-4'>
      <PageHeader
        title='Create Metric'
        description='Fill in the details for the metric'
      />

      <CreateMetricForm
        businessId={userBusiness.id}
        onCreateMetric={createMetric}
        currency={userBusiness.currency}
      />
    </article >
  )
}

export default MetricsPage
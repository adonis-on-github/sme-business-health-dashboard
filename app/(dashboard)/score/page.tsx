import type { Metadata } from 'next'

import PageHeader from '@/components/custom/page-header'
import PrerequisiteMissing from '@/components/custom/prerequisite-missing'

import { routes } from '@/app/_lib/routes'

import { getLatestMetric } from './_lib/service'
import MetricScore from './_components/metric-score/metric-score'

export const metadata: Metadata = {
  title: 'Business Health - Score',
  description: 'Business Health - Score For Business'
}

export default async function ScorePage() {
  const latestMetric = await getLatestMetric()

  return (
    <article className='max-w-xl mx-auto py-10 px-4'>
      <PageHeader title='Score' />

      {
        latestMetric === null ? (
          <PrerequisiteMissing
            title='No Metric Found'
            description='Please create a metric to continue'
            actionText='Create Metric'
            route={routes.createMetric}
          />
        ) :
          (
            <MetricScore metric={latestMetric} />
          )
      }
    </article>
  )
}
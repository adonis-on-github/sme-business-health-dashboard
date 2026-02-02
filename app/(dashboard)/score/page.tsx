import type { Metadata } from 'next'

import PageHeader from '@/components/custom/page-header'

import { routes } from '@/app/_lib/routes'

import { redirect } from 'next/navigation'

import { getLatestMetric } from '../_lib/service'
import MetricScore from './_components/metric-score/metric-score'

export const metadata: Metadata = {
  title: 'Business Health - Score',
  description: 'Business Health - Score For Business'
}

export default async function ScorePage() {
  const latestMetric = await getLatestMetric()

  if (!latestMetric) {
    return redirect(routes.createMetric)
  }

  return (
    <article className='max-w-xl mx-auto py-10 px-4'>
      <PageHeader title='Score' />

      <MetricScore metric={latestMetric} />
    </article>
  )
}
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import PageHeader from '@/components/custom/page-header'

import { routes } from '@/lib/routes'

import { getLatestMetric } from '@dashboard/_lib/service'
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
    <>
      <PageHeader title='Score' />

      <MetricScore metric={latestMetric} />
    </>
  )
}
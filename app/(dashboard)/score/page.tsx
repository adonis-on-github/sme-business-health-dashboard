import type { Metadata } from 'next'

import PageHeader from '@/components/custom/page-header'

import { getLatestMetric } from '@dashboard/_lib/service'
import MetricScore from './_components/metric-score/metric-score'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Business Health - Score',
  description: 'Business Health - Score For Business'
}

export default async function ScorePage() {
  const latestMetric = await getLatestMetric()

  return (
    <>
      <PageHeader title='Score' />

      <MetricScore metric={latestMetric} />
    </>
  )
}
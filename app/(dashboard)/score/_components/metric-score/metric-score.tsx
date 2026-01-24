
import type { LatestMetric } from '@dashboard/score/_lib/service'
import { ScoreDetails } from './score-sections'
import { ScoreSummary } from './score-sections'
import { ActionButtons } from './action-buttons'

type MetricScoreProps = {
  metric: LatestMetric
}

const MetricScore = ({ metric }: MetricScoreProps) => {
  if (metric === null) {
    return null
  }

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold text-slate-900'>{metric.businessName}</h2>

      <ScoreDetails {...metric} />

      <hr />

      <ScoreSummary {...metric} />

      <ActionButtons />
    </section>
  )
}

export default MetricScore

import { formatNumber } from '@/lib/formatting'
import type { LatestMetric } from '@/app/(dashboard)/_lib/service'
import type { ScoreStatus } from '@prisma/client'
import Timestamp from '@/components/custom/timestamp'
import {
  ScoreDetailsTestID,
  ScoreSummaryTestID
} from '@dashboard/score/_lib/test.ids'

type ScoreDetailsProps = Omit<NonNullable<LatestMetric>, 'score' | 'aiExplanation' | 'businessName'>

export const ScoreDetails = ({ revenue, expenses, cashInBank, topCustomerPct, currency }: ScoreDetailsProps) => (
  <div className='flex flex-col gap-2 text-slate-600'>

    <ScoreEntry label='Revenue' value={revenue} currency={currency} data-testid={ScoreDetailsTestID.revenue} />

    <ScoreEntry label='Expenses' value={expenses} currency={currency} data-testid={ScoreDetailsTestID.expenses} />

    <ScoreEntry label='Cash in Bank' value={cashInBank} currency={currency} data-testid={ScoreDetailsTestID.cashInBank} />

    <ScoreEntry label='Top Customer %' value={topCustomerPct} data-testid={ScoreDetailsTestID.topCustomerPct} />

  </div>
)

type ScoreEntryProps = {
  label: string
  value: number
  currency?: string
  'data-testid': string
}

export const ScoreEntry = ({ label, value, currency, 'data-testid': dataTestId }: ScoreEntryProps) => (
  <div className='flex gap-2 justify-between' data-testid={dataTestId}>
    <span className='font-semibold'>{label}</span>
    <span>{formatNumber(value, { currency })}</span>
  </div>
)

type ScoreSummaryProps = {
  score: number
  scoreStatus: ScoreStatus
  updatedAt: Date
}

export const ScoreSummary = ({ score, scoreStatus, updatedAt }: ScoreSummaryProps) => {
  const statusColor =
    scoreStatus === 'GREEN' ? 'text-green-600' :
      scoreStatus === 'YELLOW' ? 'text-yellow-600' : 'text-red-600'

  return (
    <>
      <div className='flex gap-2 text-slate-700 justify-between' data-testid={ScoreSummaryTestID.summary}>
        <div className='font-semibold' data-testid={ScoreSummaryTestID.score}>Score: {score}</div>

        <div className='flex gap-2 font-semibold'>
          <span>Status: </span>

          <span className={statusColor} data-testid={ScoreSummaryTestID.scoreStatus}>{scoreStatus}</span>
        </div>
      </div>

      <Timestamp
        className='text-right text-xs text-slate-600'
        timestamp={updatedAt}
        label='Updated at:'
        data-testid={ScoreSummaryTestID.timestamp}
      />
    </>
  )
}

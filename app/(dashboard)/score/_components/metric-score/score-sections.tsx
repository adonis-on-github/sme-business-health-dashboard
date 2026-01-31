import { formatNumber } from '@/lib/formatting'
import type { LatestMetric } from '@/app/(dashboard)/_lib/service'
import type { ScoreStatus } from '@prisma/client'
import Timestamp from '@/components/custom/timestamp'

type ScoreDetailsProps = Omit<NonNullable<LatestMetric>, 'score' | 'aiExplanation' | 'businessName'>

export const ScoreDetails = ({ revenue, expenses, cashInBank, topCustomerPct, currency, updatedAt }: ScoreDetailsProps) => (
  <div className='flex flex-col gap-2 text-slate-600'>

    <ScoreEntry label='Revenue' value={revenue} currency={currency} />

    <ScoreEntry label='Expenses' value={expenses} currency={currency} />

    <ScoreEntry label='Cash in Bank' value={cashInBank} currency={currency} />

    <ScoreEntry label='Top Customer %' value={topCustomerPct} />

    <ScoreDate label='Updated At' value={updatedAt} />
  </div>
)

type ScoreEntryProps = {
  label: string
  value: number
  currency?: string
}

export const ScoreEntry = ({ label, value, currency }: ScoreEntryProps) => (
  <div className='flex gap-2 justify-between'>
    <span className='font-semibold'>{label}</span>
    <span>{formatNumber(value, { currency })}</span>
  </div>
)

type ScoreDateProps = {
  label: string
  value: Date
}

const ScoreDate = ({ label, value }: ScoreDateProps) => (
  <div className='flex gap-2 justify-between'>
    <span className='font-semibold'>{label}:</span>

    <Timestamp timestamp={value} />
  </div>
)

type ScoreSummaryProps = {
  score: number
  scoreStatus: ScoreStatus
}

export const ScoreSummary = ({ score, scoreStatus }: ScoreSummaryProps) => {
  const statusColor =
    scoreStatus === 'GREEN' ? 'text-green-600' :
      scoreStatus === 'YELLOW' ? 'text-yellow-600' : 'text-red-600'

  return (
    <div className='flex gap-2 text-slate-700 justify-between'>
      <div className='font-semibold'>Score: {score}</div>

      <div className='flex gap-2 font-semibold'>
        <span>Status: </span>

        <span className={statusColor}>{scoreStatus}</span>
      </div>
    </div>
  )
}

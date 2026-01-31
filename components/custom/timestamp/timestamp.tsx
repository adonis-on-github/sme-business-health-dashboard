import { formatDate } from '@/lib/formatting'

type TimestampProps = {
  timestamp: Date
  label?: string
  className?: string
  'data-testid'?: string
}

const Timestamp = ({
  timestamp,
  label,
  className,
  'data-testid': dataTestId }: TimestampProps) => (
  <time
    dateTime={timestamp?.toISOString()}
    data-testid={dataTestId}
    className={className}>
    <span>{label}</span> {' '}

    <span>{formatDate(timestamp)}</span>
  </time>
)

export default Timestamp
'use client'

import { useTransition, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Timestamp from '@/components/custom/timestamp'

import type { GetInitialAnalysisResponse } from '@dashboard/explanations/_lib/actions'
import { generateAnalysis } from '@dashboard/explanations/_lib/actions'
import { ActionButton } from '@/components/custom/action-button'
import { ExplanationIds } from '@dashboard/explanations/_lib/test.ids'

type Props = {
  initialAnalysis: GetInitialAnalysisResponse
}

const ExplanationsDetails = ({ initialAnalysis }: Props) => {
  const [analysis, setAnalysis] = useState<GetInitialAnalysisResponse>(initialAnalysis)

  const [isPending, startTransition] = useTransition()

  const explanation = analysis.type === 'GENERATED' ? analysis.data : ''
  const error = analysis.type === 'ERROR' ? analysis.data : ''
  const timestamp = analysis.type === 'GENERATED' || analysis.type === 'ERROR' ? analysis.timestamp : undefined

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await generateAnalysis()

      setAnalysis(result)
    })
  }

  return (
    <div className='explanation-content flex flex-col gap-4 mt-4 mx-auto text-slate-600' data-testid={ExplanationIds.content}>
      {error && <ErrorContent error={error} />}

      {explanation && <ExplanationContent explanation={explanation} />}

      {timestamp && (
        <Timestamp
          className='text-right text-xs text-slate-600'
          timestamp={timestamp}
          label='Generated at:'
          data-testid={ExplanationIds.generatedAt}
        />
      )}

      <GenerateButton
        status={analysis.type}
        isPending={isPending}
        onClick={handleGenerate}
      />
    </div>
  )
}

const ErrorContent = ({ error }: { error: string }) => (
  <p
    className='text-red-500 text-sm'
    data-testid={ExplanationIds.explanationError}
  >
    {error}
  </p>
)

const ExplanationContent = ({ explanation }: { explanation: string }) => (
  <div data-testid={ExplanationIds.explanation}>
    <ReactMarkdown
      skipHtml={true}
      remarkPlugins={[remarkGfm]}
    >
      {explanation}
    </ReactMarkdown>
  </div>
)

type ButtonContentProps = {
  status: GetInitialAnalysisResponse['type']
  isPending: boolean
  onClick: () => void
}

const labels: Record<GetInitialAnalysisResponse['type'], string> = {
  GENERATED: 'Regenerate',
  ERROR: 'Try again',
  NO_EXPLANATION: 'Generate',
}

const GenerateButton = ({ status, isPending, onClick }: ButtonContentProps) => (
  <ActionButton
    type='button'
    text={labels[status]}
    onClick={onClick}
    isPending={isPending}
    pendingText='Generating...'
    data-testid={ExplanationIds.generateButton} />
)

export default ExplanationsDetails


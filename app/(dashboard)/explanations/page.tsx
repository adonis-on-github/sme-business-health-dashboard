import type { Metadata } from 'next'

import PageHeader from '@/components/custom/page-header'
import ExplanationsDetails from './_components/explanations-details'
import { getInitialAnalysis } from './_lib/actions'

export const metadata: Metadata = {
  title: 'Business Health - Explanations & Actions',
  description: 'Business Health - AI explanations and Actions'
}

const Explanations = async () => {
  const initialAnalysis = await getInitialAnalysis()

  return (
    <article className='max-w-2xl mx-auto py-10 px-4'>
      <PageHeader title='Explanations' description='AI explanations and actions' />

      <ExplanationsDetails initialAnalysis={initialAnalysis} />
    </article>
  )
}

export default Explanations
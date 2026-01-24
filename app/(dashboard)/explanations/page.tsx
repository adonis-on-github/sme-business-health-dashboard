import type { Metadata } from 'next'

import PageHeader from '@/components/custom/page-header'

export const metadata: Metadata = {
  title: 'Business Health - Explanations & Actions',
  description: 'Business Health - AI explanations and Actions'
}

const Explanations = () => {

  return (
    <article className='max-w-xl mx-auto py-10 px-4'>
      <PageHeader title='Explanations' description='AI explanations and actions' />

      <p className='text-slate-600'>TODO</p>

    </article>
  )
}

export default Explanations
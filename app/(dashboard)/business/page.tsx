import type { Metadata } from 'next'

import BusinessForm from './_components/business-form/business-form'
import { getBusiness } from './_lib/services'

export const metadata: Metadata = {
  title: 'Business Health - Onboarding',
  description: 'Business Health - Business Details',
}

export default async function BusinessPage() {
  const business = await getBusiness()

  return (
    <main className='max-w-xl mx-auto py-10 px-4'>
      <div className='mb-8 space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Tell us about your business
        </h1>

        <p className='text-sm text-slate-500'>
          Fill in the details of your business and location
        </p>
      </div>

      <BusinessForm initialData={business} />
    </main >
  )
}
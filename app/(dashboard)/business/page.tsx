import type { Metadata } from 'next'

import BusinessForm from './_components/business-form/business-form'
import TestBridgeWrapper from './_components/test-bridge-wrapper'
import { getBusinessService } from './_lib/registry'

export const metadata: Metadata = {
  title: 'Business Health - Onboarding',
  description: 'Business Health - Business Details',
}

const BusinessPage = async () => {
  const businessService = getBusinessService()
  const business = await businessService.getBusiness()

  return (
    <>
      <article className='max-w-xl mx-auto py-10 px-4'>
        <header className='mb-8 space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
            Tell us about your business
          </h1>

          <p className='text-sm text-slate-500'>
            Fill in the details of your business and location
          </p>
        </header>

        <BusinessForm initialData={business} />
      </article>

      {process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' && <TestBridgeWrapper />}
    </>
  )
}

export default BusinessPage

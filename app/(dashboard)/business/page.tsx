import type { Metadata } from 'next'

import PageHeader from '@/components/custom/page-header'
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
        <PageHeader
          title='Tell us about your business'
          description='Fill in the details of your business and location'
        />

        <BusinessForm initialData={business} />
      </article>

      {process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' && <TestBridgeWrapper />}
    </>
  )
}

export default BusinessPage

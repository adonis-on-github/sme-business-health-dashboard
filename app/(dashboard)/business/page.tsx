import type { Metadata } from 'next'

import PageHeader from '@/components/custom/page-header'
import BusinessForm from './_components/business-form/business-form'
import { getBusiness } from './_lib/services'

export const metadata: Metadata = {
  title: 'Business Health - Onboarding',
  description: 'Business Health - Business Details',
}

const BusinessPage = async () => {
  const business = await getBusiness()

  return (
    <>
      <PageHeader
        title='Business Details'
        description='Fill in the details of your business and location'
      />

      <BusinessForm initialData={business} />
    </>
  )
}

export default BusinessPage

'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { businessSchema, type BusinessFormValues } from '@/app/(onboarding)/business/_lib/schema'
import { createBusiness } from '@/app/(onboarding)/business/_lib/actions'
import { setServerErrors } from '@/lib/error-utils'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { IdentitySection } from '../sections/identity-section'
import { LocationSection } from '../sections/location-section'
import { SalesSection } from '../sections/sales-section'

type BusinessFormProps = {
  initialData: BusinessFormValues | null
}

const BusinessForm = ({ initialData }: BusinessFormProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const defaultValues: BusinessFormValues = {
    name: '',
    type: 'Retail',
    currency: 'INR',
    city: '',
    salesRange: 'Under 50,000',
    ...initialData
  }

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: { ...defaultValues }
  })

  const onSubmit = async (data: BusinessFormValues) => {
    startTransition(async () => {
      const result = await createBusiness(data)

      if (!result.success) {

        if (result.errors) {
          setServerErrors(result.errors, form.setError)
        }

        // TODO: Show error toast
        return
      }

      router.push('/metrics')
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-6'>
          <IdentitySection />

          <LocationSection />

          <SalesSection />
        </div>

        <Button
          type='submit'
          className='w-full py-6 text-lg shadow-lg'
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save & Continue'}
        </Button>
      </form>
    </Form>
  )
}

export default BusinessForm
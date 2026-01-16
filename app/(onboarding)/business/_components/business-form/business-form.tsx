'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { businessSchema, type BusinessFormValues } from '@/app/(onboarding)/business/_lib/schema'
import { createBusiness } from '@/app/(onboarding)/business/_lib/actions'

import { setServerErrors } from '@/lib/form-utils'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { IdentitySection } from '../sections/identity-section'
import { LocationSection } from '../sections/location-section'
import { SalesSection } from '../sections/sales-section'

const BusinessForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: '',
      type: 'Retail',
      currency: 'INR',
      city: '',
      salesRange: 'Under 50,000',
    }
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

      // TODO: Show success toast
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
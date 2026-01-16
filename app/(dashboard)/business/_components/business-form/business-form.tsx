'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { businessSchema, type BusinessFormValues } from '@business/_lib/schema'
import { SALES_RANGES, CURRENCIES, BUSINESS_TYPES } from '@business/_lib/constants'
import { BusinessFormTestID } from '@business/_lib/test.ids'
import { createBusiness } from '@business/_lib/actions'
import { setServerErrors } from '@lib/error-utils'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { IdentitySection } from './sections/identity-section'
import { LocationSection } from './sections/location-section'
import { SalesSection } from './sections/sales-section'

type BusinessFormProps = {
  initialData: BusinessFormValues | null
}

const DEFAULT_FORM_VALUES: BusinessFormValues = {
  name: '',
  type: BUSINESS_TYPES[0],
  customBusinessType: '',
  city: '',
  currency: CURRENCIES[0].value,
  salesRange: SALES_RANGES[0],
  customSalesRange: '',
}

const BusinessForm = ({ initialData }: BusinessFormProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: initialData ?? DEFAULT_FORM_VALUES,
  })

  const onSubmit = (values: BusinessFormValues) => {
    console.log(values)
    startTransition(async () => {
      const result = await createBusiness(values)

      if (result.success) {
        router.push('/metrics')
      } else if (result.errors) {
        setServerErrors(result.errors, form.setError)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-10'
      >
        <IdentitySection />

        <LocationSection />

        <SalesSection />

        <div className='flex justify-end pt-6 border-t'>
          <Button
            data-testid={BusinessFormTestID.button}
            type='submit'
            size='lg'
            className='px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20'
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default BusinessForm
'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { businessSchema, type BusinessFormValues } from '@dashboard/business/_lib/schema'
import { SALES_RANGES, CURRENCIES, BUSINESS_TYPES } from '@dashboard/business/_lib/constants'

import { BusinessFormTestID } from '@dashboard/business/_lib/test.ids'
import { createBusiness } from '@dashboard/business/_lib/actions'
import { routes } from '@/lib/routes'
import { setServerErrors } from '@/lib/zod/error-utils'

import { Form } from '@/components/ui/form'
import { toast } from 'sonner'

import { IdentitySection } from './sections/identity-section'
import { LocationSection } from './sections/location-section'
import { SalesSection } from './sections/sales-section'
import { ActionButton } from '@/components/custom/action-button'

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
    startTransition(async () => {
      const result = await createBusiness(values)

      if (result.success) {
        toast.success(result.message)

        router.push(routes.createMetric)

      } else if (result.errors) {
        setServerErrors(result.errors, form.setError)

      } else {
        toast.error(result.message)
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

        <ActionButton
          text='Save'
          pendingText='Saving...'
          data-testid={BusinessFormTestID.button}
          type='submit'
          isPending={isPending}
        />
      </form>
    </Form>
  )
}

export default BusinessForm
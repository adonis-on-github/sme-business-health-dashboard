'use client'

import { useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { toast } from 'sonner'

import { routes } from '@/app/_lib/routes'

import {
  CashInBankGroup,
  ExpensesGroup,
  RevenueGroup,
  TopCustomerPctGroup
} from './form-groups'

import { setServerErrors } from '@/lib/error-utils'
import type { MetricInput } from '@dashboard/create-metric/_lib/schema'
import { MetricSchema } from '@dashboard/create-metric/_lib/schema'
import type { CreateMetric } from '@dashboard/create-metric/_lib/types'
import { MetricFormTestID } from '@dashboard/create-metric/_lib/test.ids'
import { ActionButton } from '@/components/custom/action-button'

type CreateMetricFormProps = {
  businessId: string,
  onCreateMetric: CreateMetric
  currency: string
}

const CreateMetricForm = ({ businessId, onCreateMetric, currency }: CreateMetricFormProps) => {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const currencyOptions = useMemo(() => ({
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  } satisfies Intl.NumberFormatOptions)
    , [currency])

  const form = useForm<MetricInput>({
    resolver: zodResolver(MetricSchema)
  })

  const onSubmitHandler = (values: MetricInput) => {
    startTransition(async () => {

      const result = await onCreateMetric(businessId, values)

      if (result.success) {
        toast.success(result.message)

        form.reset()

        router.push(routes.metricScore)
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
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className='space-y-10'
      >
        <div className='flex flex-col gap-4 w-full' data-testid='demo'>
          <RevenueGroup formatOptions={currencyOptions} />

          <ExpensesGroup formatOptions={currencyOptions} />

          <CashInBankGroup formatOptions={currencyOptions} />

          <TopCustomerPctGroup />
        </div>

        <ActionButton
          text='Create Metric'
          isPending={isPending}
          data-testid={MetricFormTestID.button}
          pendingText='Creating ...'
        />
      </form>
    </Form >
  )
}

export default CreateMetricForm
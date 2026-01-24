'use client'

import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { NumberInput } from '@/components/custom/number-input'

import { MetricFormTestID } from '@dashboard/create-metric/_lib/test.ids'

type GroupPorps = {
  formatOptions: Intl.NumberFormatOptions
}

export const RevenueGroup = ({ formatOptions }: GroupPorps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name='revenue'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Revenue</FormLabel>

          <FormControl>
            <NumberInput
              {...field}
              data-testid={MetricFormTestID.revenue}
              formatOptions={formatOptions}
              placeholder='e.g. 100000.00'
            />
          </FormControl>

          <FormMessage data-testid={MetricFormTestID.revenueError} />
        </FormItem>
      )}
    />
  )
}

export const ExpensesGroup = ({ formatOptions }: GroupPorps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name='expenses'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Expenses </FormLabel>

          <FormControl>
            <NumberInput
              {...field}
              data-testid={MetricFormTestID.expenses}
              formatOptions={formatOptions}
              placeholder='e.g. 100000.00'
            />
          </FormControl>

          <FormMessage data-testid={MetricFormTestID.expensesError} />
        </FormItem>
      )}
    />
  )
}

export const CashInBankGroup = ({ formatOptions }: GroupPorps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name='cashInBank'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cash in Bank</FormLabel>

          <FormControl>
            <NumberInput
              {...field}
              data-testid={MetricFormTestID.cashInBank}
              formatOptions={formatOptions}
              placeholder='e.g. 100000.00'
            />
          </FormControl>

          <FormMessage data-testid={MetricFormTestID.cashInBankError} />
        </FormItem>
      )}
    />
  )
}

const percentFormatOptions: Intl.NumberFormatOptions = {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

export const TopCustomerPctGroup = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name='topCustomerPct'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Top Customer %</FormLabel>

          <FormControl>
            <NumberInput
              {...field}
              data-testid={MetricFormTestID.topCustomerPct}
              formatOptions={percentFormatOptions}
              maxValue='100'
              placeholder='e.g. 50.00'
            />
          </FormControl>

          <FormMessage data-testid={MetricFormTestID.topCustomerPctError} />
        </FormItem>
      )}
    />
  )
}


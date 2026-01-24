'use client'

import { useFormContext } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type BusinessFormValues } from '@dashboard/business/_lib/schema'
import { SALES_RANGES } from '@dashboard/business/_lib/constants'
import { BusinessFormTestID } from '@dashboard/business/_lib/test.ids'

export const SalesSection = () => {
  const { control, watch, setValue } = useFormContext<BusinessFormValues>()
  const salesRange = watch('salesRange')

  const handleSalesRangeChange = (value: string) => {
    setValue('salesRange', value)

    if (value !== 'Other') {
      setValue('customSalesRange', '')
    }
  }

  return (
    <div className='space-y-4 w-full'>
      <div className='pb-2 border-b'>
        <h3 className='text-lg font-semibold'>Business Scale</h3>
        <p className='text-sm text-muted-foreground'>
          Select your estimated annual sales revenue.
        </p>
      </div>

      <FormField
        control={control}
        name='salesRange'
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Annual Sales Range</FormLabel>

            <Select onValueChange={handleSalesRangeChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger
                  data-testid={BusinessFormTestID.salesRange}
                  className='w-full'
                >
                  <SelectValue placeholder='Select revenue range' />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {SALES_RANGES.map(range => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />

      {/* Custom Sales Range Field */}
      {salesRange === 'Other' && (
        <FormField
          control={control}
          name='customSalesRange'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Sales Range</FormLabel>

              <FormControl>
                <Input
                  data-testid={BusinessFormTestID.customSalesRange}
                  placeholder='e.g. 5M - 10M'
                  {...field}
                />
              </FormControl>

              <FormMessage data-testid={BusinessFormTestID.customSalesRangeError} />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
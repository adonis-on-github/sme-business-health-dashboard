'use client'

import { useFormContext } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SALES_RANGES, type BusinessFormValues } from '@/app/(onboarding)/business/_lib/schema'

export function SalesSection() {
  const { control } = useFormContext<BusinessFormValues>()

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

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className='w-full'>
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
    </div>
  )
}
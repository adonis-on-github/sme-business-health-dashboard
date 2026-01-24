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
import { CURRENCIES } from '@dashboard/business/_lib/constants'
import { BusinessFormTestID } from '@dashboard/business/_lib/test.ids'

export const LocationSection = () => {
  const { control } = useFormContext<BusinessFormValues>()

  return (
    <div className='space-y-4'>
      <div className='pb-2 border-b'>
        <h3 className='text-lg font-semibold'>Location & Currency</h3>

        <p className='text-sm text-muted-foreground'>
          Where is your business based and how do you trade?
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4 w-full'>
        {/* City Field */}
        <FormField
          control={control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>

              <FormControl>
                <Input
                  data-testid={BusinessFormTestID.city}
                  placeholder='e.g. Mumbai'
                  {...field}
                />
              </FormControl>

              <FormMessage data-testid={BusinessFormTestID.cityError} />
            </FormItem>
          )}
        />

        {/* Currency Field (Standardized to 3 chars) */}
        <FormField
          control={control}
          name='currency'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    data-testid={BusinessFormTestID.currency}
                    className='w-full sm:w-[120px]'
                  >
                    <SelectValue placeholder='Select' />

                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {CURRENCIES.map(currency => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
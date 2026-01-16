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
import { BUSINESS_TYPES, type BusinessFormValues } from '@/app/(onboarding)/business/_lib/schema'

export function IdentitySection() {
  const { control } = useFormContext<BusinessFormValues>()

  return (
    <div className='space-y-4'>
      <div className='pb-2 border-b'>
        <h3 className='text-lg font-semibold'>Business Identity</h3>
        <p className='text-sm text-muted-foreground'>How should we identify your enterprise?</p>
      </div>

      <FormField
        control={control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Legal Business Name</FormLabel>
            <FormControl>
              <Input placeholder='e.g. Sharma Textiles' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Business Type Field */}
      <FormField
        control={control}
        name='type'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Industry Type</FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select an industry' />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {BUSINESS_TYPES.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
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
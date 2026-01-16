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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type BusinessFormValues } from '@business/_lib/schema'
import { BUSINESS_TYPES } from '@business/_lib/constants'
import { BusinessFormTestID } from '@business/_lib/test.ids'

export const IdentitySection = () => {
  const { control, watch, setValue } = useFormContext<BusinessFormValues>()
  const businessType = watch('type')

  const handleBusinessTypeChange = (value: string) => {
    setValue('type', value)

    if (value !== 'Other') {
      setValue('customBusinessType', '')
    }
  }

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
              <Input
                data-testid={BusinessFormTestID.name}
                placeholder='e.g. Sharma Textiles'
                {...field}
              />
            </FormControl>

            <FormMessage data-testid={BusinessFormTestID.nameError} />
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

            <Select
              onValueChange={handleBusinessTypeChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger
                  data-testid={BusinessFormTestID.type}
                  className='w-full'
                >
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

      {/* Custom Business Type Field */}
      {businessType === 'Other' && (
        <FormField
          control={control}
          name='customBusinessType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Industry Type</FormLabel>

              <FormControl>
                <Input
                  data-testid={BusinessFormTestID.customType}
                  placeholder='e.g. Consultancy, Education'
                  {...field}
                />
              </FormControl>

              <FormMessage data-testid={BusinessFormTestID.customTypeError} />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
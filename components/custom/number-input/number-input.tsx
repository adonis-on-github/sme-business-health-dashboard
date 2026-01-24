import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { formatValue, parseFormattedInput } from '@/lib/formatting'

type NumberInputProps = {
  value: number | undefined,
  onChange: (value: number | undefined) => void,
  formatOptions: Intl.NumberFormatOptions,
  locale?: Intl.LocalesArgument,
  placeholder?: string,
  maxValue?: string
  'data-testid'?: string
} & ComponentProps<'input'>

export const NumberInput = ({
  value,
  onChange,
  placeholder,
  locale,
  formatOptions,
  maxValue,
  'data-testid': testId,
  ref,
  ...props
}: NumberInputProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [localValue, setLocalValue] = useState('')

  const formatter = useMemo(() => new Intl.NumberFormat(locale, formatOptions),
    [locale, formatOptions])

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = parseFormattedInput(target.value, formatOptions.minimumFractionDigits, maxValue)

    setLocalValue(cleanedValue)

    const numericValue = cleanedValue === '' || cleanedValue === '.'
      ? undefined
      : Number(cleanedValue)

    onChange(numericValue)
  }

  return (
    <Input
      data-testid={testId}
      {...props}
      ref={ref}
      placeholder={placeholder}
      onChange={handleInputChange}
      className='text-right'
      value={isFocused ? localValue : formatValue(value, formatter)}
      onFocus={() => {
        setIsFocused(true)

        setLocalValue(value?.toString() ?? '')
      }}
      onBlur={e => {
        setIsFocused(false)
        props.onBlur?.(e)
      }}
    />
  )
}


import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'
import { Input } from '../ui/input'

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
    const cleanedValue = parseFromattedInput(target.value, formatOptions.minimumFractionDigits, maxValue)

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

export const formatValue = (value: number | undefined, formatter: Intl.NumberFormat) => {
  if (value === undefined || value === null) {
    return ''
  }

  return formatter.format(value)
}

export const parseFromattedInput = (value: string, precision?: number, maxValue?: string) => {
  let clean = value.replace(/[^0-9.]/g, '')

  const parts = clean.split('.')

  if (parts.length >= 2) {
    clean = parts[0] + '.' + parts.slice(1).join('').slice(0, precision)
  }

  if (maxValue) {
    clean = Number(maxValue) < Number(clean) ? maxValue : clean
  }

  return clean
}
export const formatNumber = (value: number, options?: Partial<Intl.NumberFormatOptions>) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...(options?.currency && { style: 'currency' }),
    ...options,
  })
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, dateFormatOptions)
}

export const formatValue = (value: number | undefined, formatter: Intl.NumberFormat) => {
  if (value === undefined || value === null) {
    return ''
  }

  return formatter.format(value)
}

export const parseFormattedInput = (value: string, precision?: number, maxValue?: string) => {
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
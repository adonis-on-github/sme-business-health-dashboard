import { Decimal } from 'decimal.js'

type DecimalMapping<T, K extends keyof T> = {
  needs: { [P in K]: true }
  compute: (model: T) => number
}

export const decimalToNumber = <T extends object,K extends keyof T>(fields: K[]) =>
  fields.reduce((acc, field) => {
    const needs = { [field]: true } as { [P in K]: true }

    const currentObject: DecimalMapping<T, typeof field> = {
      needs,
      compute(model: T) {
        const value = model[field]

        if (value instanceof Decimal) {
          return value.toNumber()
        }

        if (typeof value === 'number') {
          return value
        }

        return Number(value)
      }
    }

    acc[field] = currentObject

    return acc
}, {} as { [P in K]: DecimalMapping<T, P> })


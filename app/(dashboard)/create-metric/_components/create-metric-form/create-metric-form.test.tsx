'use client'

import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { toast } from 'sonner'

import CreateMetricForm from './create-metric-form'

import { MetricFormTestID } from '@dashboard/create-metric/_lib/test.ids'
import type { MetricInput } from '@dashboard/create-metric/_lib/schema'

const pushMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

vi.mock('@/components/ui/sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const createMetricMock = vi.fn()

describe('CreateMetricForm', () => {
  beforeEach(() => {
    createMetricMock.mockClear()
    toast.success = vi.fn()
    toast.error = vi.fn()
  })

  it('renders', () => {
    render(<CreateMetricForm businessId='1' onCreateMetric={createMetricMock} currency='USD' />)

    expect(screen.getByTestId(MetricFormTestID.revenue)).toBeInTheDocument()
    expect(screen.queryByTestId(MetricFormTestID.revenueError)).not.toBeInTheDocument()

    expect(screen.getByTestId(MetricFormTestID.expenses)).toBeInTheDocument()
    expect(screen.queryByTestId(MetricFormTestID.expensesError)).not.toBeInTheDocument()

    expect(screen.getByTestId(MetricFormTestID.cashInBank)).toBeInTheDocument()
    expect(screen.queryByTestId(MetricFormTestID.cashInBankError)).not.toBeInTheDocument()

    expect(screen.getByTestId(MetricFormTestID.topCustomerPct)).toBeInTheDocument()
    expect(screen.queryByTestId(MetricFormTestID.topCustomerPctError)).not.toBeInTheDocument()

    expect(createMetricMock).not.toHaveBeenCalled()
  })

  describe('when form is submitted', () => {
    const input: MetricInput = {
      revenue: 100000,
      expenses: 50000,
      cashInBank: 25000,
      topCustomerPct: 50,
    }

    beforeEach(() => {
      pushMock.mockClear()

      toast.success = vi.fn()
      toast.error = vi.fn()
    })

    it('calls onCreateMetric when form is submitted with correct values', async () => {
      const user = userEvent.setup()

      createMetricMock.mockResolvedValue({
        success: true,
        message: 'Metric created successfully',
      })

      render(<CreateMetricForm businessId='1' onCreateMetric={createMetricMock} currency='USD' />)

      const revenueInput = screen.getByTestId(MetricFormTestID.revenue)

      await user.type(revenueInput, input.revenue.toString())

      const expensesInput = screen.getByTestId(MetricFormTestID.expenses)

      await user.type(expensesInput, input.expenses.toString())

      const cashInBankInput = screen.getByTestId(MetricFormTestID.cashInBank)

      await user.type(cashInBankInput, input.cashInBank.toString())

      const topCustomerPctInput = screen.getByTestId(MetricFormTestID.topCustomerPct)

      await user.type(topCustomerPctInput, input.topCustomerPct.toString())

      const submitButton = screen.getByTestId(MetricFormTestID.button)

      await user.click(submitButton)

      expect(createMetricMock).toHaveBeenCalledWith('1', input)
    })

    describe('when creation fails', () => {
      it('a toast with error message is shown', async () => {
        const user = userEvent.setup()

        toast.success = vi.fn()

        createMetricMock.mockResolvedValue({
          success: false,
          message: 'Metric creation failed',
        })

        render(<CreateMetricForm businessId='1' onCreateMetric={createMetricMock} currency='USD' />)

        const revenueInput = screen.getByTestId(MetricFormTestID.revenue)

        await user.type(revenueInput, input.revenue.toString())

        const expensesInput = screen.getByTestId(MetricFormTestID.expenses)

        await user.type(expensesInput, input.expenses.toString())

        const cashInBankInput = screen.getByTestId(MetricFormTestID.cashInBank)

        await user.type(cashInBankInput, input.cashInBank.toString())

        const topCustomerPctInput = screen.getByTestId(MetricFormTestID.topCustomerPct)

        await user.type(topCustomerPctInput, input.topCustomerPct.toString())

        const submitButton = screen.getByTestId(MetricFormTestID.button)

        await user.click(submitButton)

        expect(toast.error).toHaveBeenCalledWith('Metric creation failed')
      })
    })

    describe('when values are invalid', () => {
      it('error messages are shown', async () => {
        const user = userEvent.setup()

        toast.success = vi.fn()

        createMetricMock.mockResolvedValue({
          success: false,
          message: 'Metric creation failed',
          errors: {
            revenue: ['Revenue is required'],
            expenses: ['Expenses is required'],
            cashInBank: ['Cash in bank is required'],
            topCustomerPct: ['Top customer percentage is required'],
          },
        })

        render(<CreateMetricForm businessId='1' onCreateMetric={createMetricMock} currency='USD' />)

        const revenueInput = screen.getByTestId(MetricFormTestID.revenue)

        await user.type(revenueInput, input.revenue.toString())

        const expensesInput = screen.getByTestId(MetricFormTestID.expenses)

        await user.type(expensesInput, input.expenses.toString())

        const cashInBankInput = screen.getByTestId(MetricFormTestID.cashInBank)

        await user.type(cashInBankInput, input.cashInBank.toString())

        const topCustomerPctInput = screen.getByTestId(MetricFormTestID.topCustomerPct)

        await user.type(topCustomerPctInput, input.topCustomerPct.toString())

        const submitButton = screen.getByTestId(MetricFormTestID.button)

        await user.click(submitButton)

        expect(screen.getByTestId(MetricFormTestID.revenueError)).toHaveTextContent('Revenue is required')
        expect(screen.getByTestId(MetricFormTestID.expensesError)).toHaveTextContent('Expenses is required')
        expect(screen.getByTestId(MetricFormTestID.cashInBankError)).toHaveTextContent('Cash in bank is required')
        expect(screen.getByTestId(MetricFormTestID.topCustomerPctError)).toHaveTextContent('Top customer percentage is required')
      })
    })

  })
})
'use client'

import type { ButtonHTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'

type ActionButtonProps = {
  text: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  isPending?: boolean
  pendingText?: string
  onClick?: () => void
  'data-testid'?: string
}

export const ActionButton = ({
  isPending,
  type = 'submit',
  text,
  pendingText,
  onClick,
  'data-testid': dataTestId }: ActionButtonProps) => (
  <div className='flex w-full sm:justify-end pt-6 border-t'>
    <Button
      type={type}
      size='lg'
      className='w-full sm:w-auto px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20'
      data-testid={dataTestId}
      disabled={isPending}
      onClick={onClick}
    >
      {isPending ? pendingText : text}
    </Button>
  </div>
)
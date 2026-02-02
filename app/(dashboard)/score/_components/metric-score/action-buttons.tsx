'use client'

import { useRouter } from 'next/navigation'
import { ActionButton } from '@/components/custom/action-button'

import { routes } from '@/lib/routes'

export const ActionButtons = () => {
  const router = useRouter()

  return (
    <ActionButton
      text='Explanation & Actions'
      type='button'
      onClick={() => router.push(routes.explanations)}
    />
  )
}
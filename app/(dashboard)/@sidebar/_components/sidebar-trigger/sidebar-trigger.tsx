'use client'

import { PanelLeftOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'

type TriggerButtonProps = {
  className?: string
}

export const TriggerButton = ({ className }: TriggerButtonProps) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant='secondary'

      onClick={toggleSidebar}
      className={className}
    >
      <PanelLeftOpen size={36} />
    </Button>
  )
}

'use client'

import {
  PanelLeftOpen,
  PanelLeftClose,
  Menu
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { useIsMobile } from '@/lib/shadcn/hooks/use-mobile'

export const SidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar()
  const isMobile = useIsMobile()

  const icon = isMobile
    ? <Menu />
    : open
      ? <PanelLeftClose />
      : <PanelLeftOpen />

  return (
    <Button
      size='icon'
      variant='secondary'
      aria-label='Toggle sidebar'
      onClick={toggleSidebar}
    >
      {icon}
    </Button>
  )
}

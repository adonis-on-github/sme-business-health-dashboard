'use client'

import {
  PanelLeftOpen,
  PanelLeftClose,
  Menu
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { useIsMobile } from '@/lib/shadcn/hooks/use-mobile'

import { SidebarTriggerID } from '@header/_lib/test.ids'

export const SidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar()
  const isMobile = useIsMobile()

  const icon = isMobile
    ? <Menu data-testid={SidebarTriggerID.menuIcon} />
    : open
      ? <PanelLeftClose data-testid={SidebarTriggerID.closeIcon} />
      : <PanelLeftOpen data-testid={SidebarTriggerID.openIcon} />

  return (
    <Button
      size='icon'
      variant='secondary'
      aria-label='Toggle sidebar'
      onClick={toggleSidebar}
      data-testid={SidebarTriggerID.trigger}
    >
      {icon}
    </Button>
  )
}

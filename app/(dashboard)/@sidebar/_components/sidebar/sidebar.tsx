'use client'

import {
  Sidebar as ScnSidebar,
} from '@/components/ui/sidebar'

import { SidebarHeader } from '@sidebar/_components/sidebar-header'
import { SidebarContent } from '@sidebar/_components/sidebar-content'

type SidebarProps = {
  userEmail?: string
}
export const Sidebar = ({ userEmail }: SidebarProps) => {
  return (
    <ScnSidebar
      side='left'
      variant='sidebar'
      collapsible='icon'
    >
      <SidebarHeader userEmail={userEmail} />

      <SidebarContent />

    </ScnSidebar >
  )
}

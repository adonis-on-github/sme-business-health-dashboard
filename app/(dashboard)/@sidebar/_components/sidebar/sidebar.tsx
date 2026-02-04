'use client'

import {
  Sidebar as ScnSidebar,
  useSidebar,
} from '@/components/ui/sidebar'

import { SidebarHeader } from '@sidebar/_components/sidebar-header'
import { SidebarContent } from '@sidebar/_components/sidebar-content'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

type SidebarProps = {
  userEmail?: string
}
export const Sidebar = ({ userEmail }: SidebarProps) => {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  useEffect(() => {
    setOpenMobile(false)
  }, [pathname, setOpenMobile])

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

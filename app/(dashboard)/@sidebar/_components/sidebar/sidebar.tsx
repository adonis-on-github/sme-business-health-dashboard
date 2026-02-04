
import {
  Sidebar as ScnSidebar,
} from '@/components/ui/sidebar'

import { SidebarHeader } from '@sidebar/_components/sidebar-header'
import { SidebarContent } from '@sidebar/_components/sidebar-content'
import { SidebarFooter } from '@sidebar/_components/sidebar-footer'
import { getUser } from '@/lib/supabase/server'

export const Sidebar = async () => {
  const user = await getUser()

  return (
    <ScnSidebar side='left' variant='sidebar' collapsible='icon' >
      <SidebarHeader userEmail={user?.email} />

      <SidebarContent />

      <SidebarFooter />
    </ScnSidebar >
  )
}

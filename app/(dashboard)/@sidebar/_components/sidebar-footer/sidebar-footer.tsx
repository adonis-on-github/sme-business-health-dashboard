import { LogOut } from 'lucide-react'

import { logout } from '@/lib/auth/actions'
import {
  SidebarFooter as ScnSidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'

export const SidebarFooter = () => {
  return (
    <ScnSidebarFooter className='border-t border-slate-200 bg-slate-150'>
      <SidebarMenu>
        <SidebarMenuItem className='flex gap-2 items-center'>
          <SidebarMenuButton
            className='text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 w-full'
            onClick={logout}
          >
            <LogOut size={18} />

            Logout
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </ScnSidebarFooter>
  )
}
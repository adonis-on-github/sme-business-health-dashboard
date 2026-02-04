'use client'

import {
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  User
} from 'lucide-react'

import {
  SidebarHeader as ScnSidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'

import { CollapsibleContent } from '@sidebar/_components/collapsible-content'
import { logout } from '@/lib/auth/actions'
import { useIsMobile } from '@/lib/shadcn/hooks/use-mobile'

type SidebarHeaderProps = {
  userEmail?: string
}
export const SidebarHeader = ({ userEmail }: SidebarHeaderProps) => {
  const { open } = useSidebar()

  return (
    <ScnSidebarHeader className='mb-4 border-b border-slate-200'>
      <SidebarMenu>
        <SidebarMenuItem>
          <CollapsibleTriggerButton />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton className='flex gap-1 items-center text-indigo-600'>
            <CollapsibleContent
              open={open}
              collapsedContent={<User size={18} />}
              expandedContent={<span className='text-indigo-600 font-normal'>{userEmail}</span>}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuButton
          onClick={logout}
          className='text-indigo-600 hover:text-indigo-700 w-full'          >
          <LogOut size={18} />

          Logout
        </SidebarMenuButton>
      </SidebarMenu>
    </ScnSidebarHeader >
  )
}

export const CollapsibleTriggerButton = () => {
  const { open, toggleSidebar } = useSidebar()
  const isMobile = useIsMobile()

  const icon = open ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />

  if (isMobile) {
    return (
      <SidebarMenuButton
        onClick={toggleSidebar}
      >
        <SidebarTitle />
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuButton
      onClick={toggleSidebar}
    >

      <CollapsibleContent
        open={open}
        collapsedContent={icon}
      >
        <SidebarTitle />
      </CollapsibleContent>

    </SidebarMenuButton>
  )
}

const SidebarTitle = () => (
  <div className='text-slate-700 text-sm font-semibold'>
    <span className='text-emerald-600'>SME</span>{' '}
    <span className='text-blue-600'>Business</span>{' '}
    <span className='text-orange-600'>Health</span>
  </div>
)
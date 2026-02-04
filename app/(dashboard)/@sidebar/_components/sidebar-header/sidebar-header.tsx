'use client'

import { LogOut, PanelLeftClose, PanelLeftOpen, User } from 'lucide-react'

import {
  SidebarHeader as ScnSidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'

import { CollapsibleContent } from '@sidebar/_components/collapsible-content'

type SidebarHeaderProps = {
  userEmail?: string
}

export const SidebarHeader = ({ userEmail }: SidebarHeaderProps) => {
  const { open } = useSidebar()

  return (
    <ScnSidebarHeader className='mb-4 border-b border-slate-200'>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarTriggerButton />
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
          className='text-indigo-600 hover:text-indigo-700 w-full'          >
          <LogOut size={18} />

          Logout
        </SidebarMenuButton>
      </SidebarMenu>
    </ScnSidebarHeader>
  )
}

const SidebarTriggerButton = () => {
  const { open, toggleSidebar } = useSidebar()

  return (
    <SidebarMenuButton
      onClick={toggleSidebar}
    >
      <CollapsibleContent
        open={open}
        collapsedContent={open ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
      >
        <span className='text-emerald-600'>SME</span>{' '}
        <span className='text-blue-600'>Business</span>{' '}
        <span className='text-orange-600'>Health</span>
      </CollapsibleContent>
    </SidebarMenuButton>
  )
}
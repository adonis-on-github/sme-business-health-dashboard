'use client'

import { User } from 'lucide-react'

import {
  SidebarHeader as ScnSidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import { cn } from '@/lib/shadcn/utils'

import type { } from 'lucide-react'

type SidebarHeaderProps = {
  userEmail?: string
}

export const SidebarHeader = ({ userEmail }: SidebarHeaderProps) => {
  const { open } = useSidebar()

  return (
    <ScnSidebarHeader className='mb-2 border-b border-slate-200 bg-slate-150'>
      <SidebarMenu>
        <SidebarMenuItem className='flex gap-2 justify-start items-center overflow-hidden'>
          <div className='flex-shrink-0'>
            <SidebarTrigger size='icon' />
          </div>

          <SidebarMenuButton
            className={cn('whitespace-nowrap transition-all duration-200 ease-in-out text-slate-700 text-sm font-semibold',
              open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
            )}
          >
            <span className='text-indigo-600'>SME</span> Business Health
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton className='flex gap-2 items-center'>
            <div className='flex-shrink-0'>
              <User size={18} />
            </div>

            <div className={cn('whitespace-nowrap transition-all duration-200 ease-in-out text-slate-700 text-sm font-semibold',
              open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
            )}>
              {userEmail}
            </div>

          </SidebarMenuButton>
        </SidebarMenuItem>

      </SidebarMenu>
    </ScnSidebarHeader>
  )
}
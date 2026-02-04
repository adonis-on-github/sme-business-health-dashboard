'use client'
import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  SidebarContent as ScnSidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'

import { routes } from '@/lib/routes'
import {
  Briefcase,
  ChartLine,
  Gauge,
  BookOpen
} from 'lucide-react'
import { cn } from '@/lib/shadcn/utils'

type LinkItem = {
  name: string
  href: typeof routes[keyof typeof routes]
  icon: ReactNode
}

const links: LinkItem[] = [
  { name: 'Business', href: routes.business, icon: <Briefcase size={18} /> },
  { name: 'Create Metric', href: routes.createMetric, icon: <ChartLine size={18} /> },
  { name: 'Score', href: routes.metricScore, icon: <Gauge size={18} /> },
  { name: 'Explanations', href: routes.explanations, icon: <BookOpen size={18} /> }
]

export const SidebarContent = () => {
  const pathname = usePathname()
  const { open } = useSidebar()

  return (
    <ScnSidebarContent>
      <SidebarMenu>
        {links.map(link => (
          <SidebarItem
            key={link.name}
            linkItem={link}
            isActive={pathname === link.href}
            open={open}
          />
        ))}
      </SidebarMenu>
    </ScnSidebarContent>
  )
}

type SindebarItemProps = {
  linkItem: LinkItem
  isActive: boolean
  open: boolean
}

const SidebarItem = ({ linkItem, isActive, open }: SindebarItemProps) => {

  return (
    <SidebarMenuItem className='px-1'>
      <SidebarMenuButton asChild className='transition-all duration-200 data-[active=true]:text-blue-700' isActive={isActive}>
        <Link
          href={linkItem.href}
          className='flex gap-2 items-center gap-2'
        >
          <div className='flex-shrink-0'>
            {linkItem.icon}
          </div>

          <span className={cn('transition-all duration-300 truncate',
            open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-w-0 overflow-hidden'
          )}>
            {linkItem.name}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}


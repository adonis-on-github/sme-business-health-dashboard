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
import { CollapsibleContent } from '../collapsible-content'

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

type SidebarContentProps = {
  onNavigate?: () => void
}
export const SidebarContent = ({ onNavigate }: SidebarContentProps) => {
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
            onNavigate={onNavigate}
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
  onNavigate?: () => void
}

const SidebarItem = ({ linkItem, isActive, open, onNavigate }: SindebarItemProps) => (
  <SidebarMenuItem className='px-1'>
    <SidebarMenuButton asChild className='transition-all duration-200 data-[active=true]:text-blue-700' isActive={isActive}>
      <Link
        href={linkItem.href}
        aria-current={isActive ? 'page' : undefined}
        className='flex gap-2 items-center'
        onClick={onNavigate}
      >
        <CollapsibleContent
          open={open}
          collapsedContent={linkItem.icon}
          expandedContent={linkItem.name} />
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
)


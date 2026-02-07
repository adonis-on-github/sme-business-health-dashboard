'use client'

import {
  Briefcase,
  ChartLine,
  Gauge,
  BookOpen
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarMenu
} from '@/components/ui/sidebar'

import type { LinkItem } from '@sidebar/_lib/types'

import { routes } from '@/lib/routes'

import { SidebarItem } from '@sidebar/_components/sidebar-item'

export const links: LinkItem[] = [
  { name: 'Business', href: routes.business, icon: <Briefcase size={18} /> },
  { name: 'Create Metric', href: routes.createMetric, icon: <ChartLine size={18} /> },
  { name: 'Score', href: routes.metricScore, icon: <Gauge size={18} /> },
  { name: 'Explanations', href: routes.explanations, icon: <BookOpen size={18} /> }
]

const SidebarPage = () => {
  return (
    <Sidebar
      side='left'
      variant='sidebar'
      collapsible='icon'
      className='mt-12'
    >
      <SidebarContent>
        <SidebarMenu>
          {
            links.map(link => (
              <SidebarItem
                key={link.name}
                linkItem={link}
              />
            ))
          }
        </SidebarMenu>

      </SidebarContent>

    </Sidebar>
  )
}

export default SidebarPage
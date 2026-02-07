
import Link from 'next/link'

import { usePathname } from 'next/navigation'

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import { CollapsibleContent } from '@/components/custom/collapsible-content'
import type { LinkItem } from '@sidebar/_lib/types'

import { SidebarItemID } from '@sidebar/_lib/test.ids'

type SindebarItemProps = {
  linkItem: LinkItem
}

export const SidebarItem = ({ linkItem }: SindebarItemProps) => {
  const { setOpenMobile, open } = useSidebar()
  const pathname = usePathname()

  const isActive = pathname === linkItem.href

  return (
    <SidebarMenuItem className='px-1' data-testid={SidebarItemID.root}>
      <SidebarMenuButton
        asChild
        className='transition-all duration-200 data-[active=true]:text-blue-700' isActive={isActive}
      >
        <Link
          href={linkItem.href}
          aria-current={isActive ? 'page' : undefined}
          className='flex gap-2 items-center'
          onClick={() => setOpenMobile(false)}
          data-testid={SidebarItemID.link}
        >
          <CollapsibleContent
            open={open}
            collapsedContent={linkItem.icon}
            expandedContent={linkItem.name}
          />
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}


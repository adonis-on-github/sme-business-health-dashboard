import type { ReactNode } from 'react'
import { cn } from '@/lib/shadcn/utils'

import { CollapsibleID } from './test.ids'

type CollapsibleContentButtonPropsBase = {
  open: boolean
  collapsedContent: ReactNode
}

type CollapsibleContentButtonPropsExpanded = CollapsibleContentButtonPropsBase & {
  expandedContent: string | ReactNode
  children?: never
}

type CollapsibleContentButtonPropsChildren = CollapsibleContentButtonPropsBase & {
  expandedContent?: never
  children: ReactNode
}

type CollapsibleContentProps =
  | CollapsibleContentButtonPropsExpanded
  | CollapsibleContentButtonPropsChildren

export const CollapsibleContent = ({ open, collapsedContent, expandedContent, children }: CollapsibleContentProps) => {
  return (
    <div
      className='flex items-center gap-2'
      data-testid={CollapsibleID.root}
    >
      <div className='flex-shrink-0' data-testid={CollapsibleID.fixedContent}>
        {collapsedContent}
      </div>

      <div
        className={cn('whitespace-nowrap transition-all duration-200 ease-in-out text-slate-700 text-sm font-semibold',
          open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
        )}
        data-testid={CollapsibleID.dynamicContent}
        aria-hidden={!open}
      >
        {expandedContent ?? children}
      </div>
    </div>
  )
}
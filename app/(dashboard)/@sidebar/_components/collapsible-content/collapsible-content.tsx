import type { ReactNode } from 'react'
import { cn } from '@/lib/shadcn/utils'

type CollapsibleContentProps = {
  open: boolean
  collapsedContent: ReactNode
  expandedContent?: string | ReactNode
  children?: ReactNode
  'data-testid'?: string
}
export const CollapsibleContent = ({ open, collapsedContent, expandedContent, children, 'data-testid': dataTestId }: CollapsibleContentProps) => {
  return (
    <>
      <div className='flex-shrink-0'>
        {collapsedContent}
      </div>

      <div
        className={cn('whitespace-nowrap transition-all duration-200 ease-in-out text-slate-700 text-sm font-semibold',
          open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
        )}
        data-testid={dataTestId}
        aria-hidden={!open}
      >
        {expandedContent ?? children}
      </div>
    </>
  )
}
import type { ReactNode } from 'react'
import type { routes } from '@/lib/routes'

export type LinkItem = {
  name: string
  href: typeof routes[keyof typeof routes]
  icon: ReactNode
}

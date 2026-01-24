'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '../_lib/routes'

const links = [
  { name: 'Business', href: routes.business },
  { name: 'Create Metric', href: routes.createMetric },
  { name: 'Score', href: routes.metricScore },
  { name: 'Explanations', href: routes.explanations }
]

export const Sections = () => {
  const pathname = usePathname()

  return (
    <nav className='flex ml-3 gap-4 text-slate-800'>

      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={pathname === link.href ? 'text-blue-500' : 'text-slate-700'}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
import { SidebarProvider } from '@/components/ui/sidebar'
import type { ReactNode } from 'react'
import { TriggerButton } from './@sidebar/_components/sidebar-trigger'

const DashboardLayout = ({ children, sidebar }: { children: ReactNode; sidebar?: ReactNode }) => (
  <div className='flex min-h-screen'>
    <SidebarProvider>
      <aside>
        {sidebar}
      </aside>

      <main className='flex-1 overflow-auto'>
        <TriggerButton className='md:hidden' />

        {children}
      </main>
    </SidebarProvider>
  </div>
)

export default DashboardLayout
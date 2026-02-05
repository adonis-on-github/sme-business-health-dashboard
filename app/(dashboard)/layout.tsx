import type { ReactNode } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'

type DashboardLayoutProps = {
  children: ReactNode
  sidebar: ReactNode
  header: ReactNode
}

const DashboardLayout = ({ children, sidebar, header }: DashboardLayoutProps) => (
  <SidebarProvider>
    <div className='flex flex-col w-full'>
      {header}

      <div className='flex w-full'>
        <aside>
          {sidebar}
        </aside>

        <main className='flex-1 overflow-auto'>
          <article className='max-w-xl mx-auto py-10 px-4'>
            {children}
          </article>
        </main>
      </div>
    </div>
  </SidebarProvider>
)

export default DashboardLayout
import type { ReactNode } from 'react'

const DashboardLayout = ({ children, sidebar }: { children: ReactNode; sidebar?: ReactNode }) => {

  return (
    <div className='flex min-h-screen'>
      <aside>
        {sidebar}
      </aside>

      <main className='flex-1'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
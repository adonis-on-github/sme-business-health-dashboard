import { getUser } from '@/lib/supabase/server'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from '@sidebar/_components/sidebar'

const SidebarPage = async () => {
  const user = await getUser()

  return (
    <SidebarProvider>
      <Sidebar userEmail={user?.email} />
    </SidebarProvider>
  )
}

export default SidebarPage
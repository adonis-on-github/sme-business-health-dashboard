import { SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from './_components/sidebar/sidebar'

const SidebarPage = async () => (
  <SidebarProvider>
    <Sidebar />
  </SidebarProvider>
)

export default SidebarPage
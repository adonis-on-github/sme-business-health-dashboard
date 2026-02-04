import { getUser } from '@/lib/supabase/server'
import { Sidebar } from '@sidebar/_components/sidebar'

const SidebarPage = async () => {
  const user = await getUser()

  return (
    <Sidebar userEmail={user?.email} />
  )
}

export default SidebarPage
import { SidebarTrigger } from '@header/_components/sidebar-trigger'
import { Logo } from '@/components/custom/logo'
import { UserMenu } from '@/app/(dashboard)/@header/_components/user-menu'

const Header = () => {
  return (
    <header
      className='sticky top-0 z-50 border-b bg-background flex justify-between items-center px-2 py-1 w-full'>

      <div className='flex flex-1 gap-2 items-center font-bold text-sm'>
        <SidebarTrigger />

        <Logo />
      </div>

      <UserMenu />

    </header >
  )
}

export default Header
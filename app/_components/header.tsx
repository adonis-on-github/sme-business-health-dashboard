import type { User } from '@supabase/supabase-js'
import { logout } from '@auth/actions'
import { Button } from '@/components/ui/button'

type HeaderProps = {
  user: User | null
}

export const Header = ({ user }: HeaderProps) => {
  if (!user) {
    return null
  }

  return (
    <header className='w-full py-4 px-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50'>
      <div className='flex items-center space-x-2'>
        <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
          <span className='text-white font-bold text-xs'>SH</span>
        </div>

        <span className='font-semibold tracking-tight'>SME Business Health</span>
      </div>

      <div className='flex items-center space-x-4'>
        <span className='text-sm text-zinc-500 dark:text-zinc-400 hidden sm:inline-block'>
          {user.email}
        </span>

        <form action={logout}>
          <Button
            variant='ghost'
            className='text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20'
            type='submit'
          >
            Logout
          </Button>
        </form>
      </div>
    </header>
  )
}

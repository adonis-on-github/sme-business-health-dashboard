import { LogOut } from 'lucide-react'

import { logout } from '@/lib/auth/actions'
import { getUser } from '@/lib/supabase/server'

import {
  Avatar,
  AvatarFallback
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const UserMenu = async () => {
  const user = await getUser()
  const fallback = user?.email?.substring(0, 2).toUpperCase() ?? 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer'>
          <AvatarFallback className='font-semibold'>
            {fallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='mr-4'>
        <DropdownMenuLabel className='text-xs text-indigo-600'>{user?.email}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className='cursor-pointer'>
          <LogOut />

          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
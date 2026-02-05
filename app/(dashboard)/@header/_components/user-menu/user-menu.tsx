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
import { UserMenuID } from '@header/_lib/test.ids'

export const UserMenu = async () => {
  const user = await getUser()
  const fallback = user?.email?.substring(0, 2).toUpperCase() ?? 'U'

  return (
    <DropdownMenu data-testid={UserMenuID.root}>
      <DropdownMenuTrigger asChild>
        <Avatar className='cursor-pointer' data-testid={UserMenuID.avatar}>
          <AvatarFallback className='font-semibold' data-testid={UserMenuID.avatarFallback}>
            {fallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='mr-4' data-testid={UserMenuID.menuContent}>
        <DropdownMenuLabel className='text-xs text-indigo-600' data-testid={UserMenuID.menuLabel}>
          {user?.email}
        </DropdownMenuLabel>

        <DropdownMenuSeparator data-testid={UserMenuID.menuSeparator} />

        <DropdownMenuItem
          onClick={logout}
          className='cursor-pointer'
          data-testid={UserMenuID.menuLogout}
        >
          <LogOut />

          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
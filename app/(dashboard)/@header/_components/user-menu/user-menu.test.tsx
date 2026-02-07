import { render, screen } from '@testing-library/react'

import { UserMenuID } from '@header/_lib/test.ids'

import { logout } from '@/lib/auth/actions'
import { getUser } from '@/lib/supabase/server'
import { userMock } from '@/lib/supabase/supabase.mocks'

import { UserMenu } from './user-menu'

vi.mock('@/lib/supabase/server', async () => ({
  getUser: vi.fn(),
}))

vi.mock('@/lib/auth/actions', () => ({
  logout: vi.fn(),
}))

describe('UserMenu', () => {

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(getUser).mockResolvedValue(userMock)
  })

  it('renders the avatar with correct fallback initials', async () => {
    const component = await UserMenu()

    render(component)

    expect(screen.getByTestId(UserMenuID.avatar)).toBeInTheDocument()
    expect(screen.getByTestId(UserMenuID.avatarFallback)).toHaveTextContent('US')
  })

  describe('when user click on avatar', () => {
    it('opens the menu', async () => {
      const user = userEvent.setup()
      const component = await UserMenu()

      render(component)

      await user.click(screen.getByTestId(UserMenuID.avatar))

      expect(screen.getByTestId(UserMenuID.menuContent)).toBeInTheDocument()
      expect(screen.getByTestId(UserMenuID.menuSeparator)).toBeInTheDocument()
      expect(screen.getByTestId(UserMenuID.menuLabel)).toHaveTextContent(userMock.email)
    })
  })

  describe('when user click on logout', () => {
    it('calls logout action', async () => {
      const user = userEvent.setup()
      const component = await UserMenu()

      render(component)

      await user.click(screen.getByTestId(UserMenuID.avatar))

      await user.click(screen.getByTestId(UserMenuID.menuLogout))

      expect(logout).toHaveBeenCalledTimes(1)
    })
  })
})

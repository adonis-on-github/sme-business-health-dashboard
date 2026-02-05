import { render } from '@testing-library/react'

import { UserMenu } from '@header/_components/user-menu'
import { SidebarTrigger } from '@header/_components/sidebar-trigger'
import { Logo } from '@/components/custom/logo'

import Header from '@header/default'

vi.mock('@header/_components/user-menu', () => ({
  UserMenu: vi.fn()
}))

vi.mock('@header/_components/sidebar-trigger', () => ({
  SidebarTrigger: vi.fn()
}))

vi.mock('@/components/custom/logo', () => ({
  Logo: vi.fn()
}))

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the header with all its components', () => {
    render(<Header />)

    // Note: This is only the possible way to test this component
    // mainly because the UserMenu is an async child component
    expect(vi.mocked(UserMenu)).toHaveBeenCalledTimes(1)
    expect(vi.mocked(SidebarTrigger)).toHaveBeenCalledTimes(1)
    expect(vi.mocked(Logo)).toHaveBeenCalledTimes(1)
  })
})
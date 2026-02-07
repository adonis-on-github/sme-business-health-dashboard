import { screen, render } from '@/lib/testing-library/test-utils'

import { usePathname } from 'next/navigation'

import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import { CollapsibleContent } from '@/components/custom/collapsible-content'

import { SidebarItem } from './sidebar-item'
import { SidebarItemID } from '@sidebar/_lib/test.ids'
import type { LinkItem } from '@sidebar/_lib/types'

vi.mock('@/lib/shadcn/hooks/use-mobile', () => ({
  useIsMobile: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('@/components/ui/sidebar', async () => {
  const actual = await vi.importActual('@/components/ui/sidebar')

  return {
    ...actual,
    useSidebar: vi.fn(),
  }
})

vi.mock('@/components/custom/collapsible-content', () => ({
  CollapsibleContent: vi.fn(),
}))

const ICON_TEST_ID = 'sidebar-item-icon'

describe('SidebarItem', () => {
  beforeEach(() => {
    vi.mocked(useSidebar).mockReturnValue({
      open: true,
      setOpenMobile: vi.fn(),
    } as unknown as ReturnType<typeof useSidebar>)

    vi.mocked(usePathname).mockReturnValue('/')
  })

  const mockItem: LinkItem = {
    href: '/',
    name: 'Home',
    icon: <span data-testid={ICON_TEST_ID}>H</span>,
  }

  it('renders correctly', () => {
    render(
      <SidebarProvider>
        <SidebarItem linkItem={mockItem} />
      </SidebarProvider>
    )

    expect(screen.getByTestId(SidebarItemID.root)).toBeInTheDocument()
    expect(screen.getByTestId(SidebarItemID.link)).toHaveAttribute('href', mockItem.href)

    expect(vi.mocked(CollapsibleContent)).toHaveBeenCalledWith(expect.objectContaining({
      open: true,
      collapsedContent: mockItem.icon,
      expandedContent: mockItem.name,
    }), undefined)
  })

  describe('when sidebar is closed', () => {
    beforeEach(() => {
      vi.mocked(useSidebar).mockReturnValue({
        open: false,
        setOpenMobile: vi.fn(),
      } as unknown as ReturnType<typeof useSidebar>)
    })

    it('renders correctly', () => {
      render(
        <SidebarProvider>
          <SidebarItem linkItem={mockItem} />
        </SidebarProvider>
      )

      expect(screen.getByTestId(SidebarItemID.root)).toBeInTheDocument()
      expect(screen.getByTestId(SidebarItemID.link)).toHaveAttribute('href', mockItem.href)

      expect(vi.mocked(CollapsibleContent)).toHaveBeenCalledWith(expect.objectContaining({
        open: false,
        collapsedContent: mockItem.icon,
        expandedContent: mockItem.name,
      }), undefined)
    })
  })

  describe('when use clicks on link', () => {
    it('calls setOpenMobile with false', async () => {
      const user = userEvent.setup()

      const setOpenMobile = vi.fn()

      vi.mocked(useSidebar).mockReturnValue({
        open: true,
        setOpenMobile,
      } as unknown as ReturnType<typeof useSidebar>)

      render(
        <SidebarProvider>
          <SidebarItem linkItem={mockItem} />
        </SidebarProvider>
      )

      await user.click(screen.getByTestId(SidebarItemID.link))

      expect(setOpenMobile).toHaveBeenCalledWith(false)
    })

  })
})
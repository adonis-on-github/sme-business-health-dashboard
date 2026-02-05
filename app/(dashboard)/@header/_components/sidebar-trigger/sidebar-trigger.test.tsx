import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import { useIsMobile } from '@/lib/shadcn/hooks/use-mobile'
import { SidebarTriggerID } from '@header/_lib/test.ids'
import type { Sidebar } from '@/components/ui/sidebar'

import { SidebarTrigger } from './sidebar-trigger'

vi.mock('@/lib/shadcn/hooks/use-mobile', () => ({
  useIsMobile: vi.fn(),
}))

vi.mock('@/components/ui/sidebar', async () => {
  const actual = await vi.importActual<typeof Sidebar>('@/components/ui/sidebar')

  return {
    ...actual,
    useSidebar: vi.fn(),
  }
})

describe('SidebarTrigger', () => {
  const toggleSidebar = vi.fn()

  const mockUseSidebarResult: ReturnType<typeof useSidebar> = {
    toggleSidebar,
    open: true,
    state: 'expanded',
    setOpen: vi.fn(),
    openMobile: false,
    setOpenMobile: vi.fn(),
    isMobile: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useIsMobile).mockReturnValue(false)

    vi.mocked(useSidebar).mockReturnValue(mockUseSidebarResult)
  })

  describe('Desktop View', () => {
    it('renders the close icon when the sidebar is open', () => {
      render(
        <SidebarProvider>
          <SidebarTrigger />
        </SidebarProvider>
      )

      expect(screen.getByTestId(SidebarTriggerID.closeIcon)).toBeInTheDocument()
    })

    it('renders the open icon when the sidebar is closed', () => {
      vi.mocked(useSidebar).mockReturnValue({
        ...mockUseSidebarResult,
        open: false,
        state: 'collapsed',
      })

      render(
        <SidebarProvider>
          <SidebarTrigger />
        </SidebarProvider>
      )

      expect(screen.getByTestId(SidebarTriggerID.openIcon)).toBeInTheDocument()
    })

    it('calls toggleSidebar when clicked', async () => {
      const user = userEvent.setup()

      render(
        <SidebarProvider>
          <SidebarTrigger />
        </SidebarProvider>
      )

      await user.click(screen.getByTestId(SidebarTriggerID.trigger))

      expect(toggleSidebar).toHaveBeenCalledTimes(1)
    })
  })

  describe('Mobile View', () => {
    beforeEach(() => {
      vi.mocked(useIsMobile).mockReturnValue(true)
    })

    it('renders the menu icon regardless of open state', () => {
      render(
        <SidebarProvider>
          <SidebarTrigger />
        </SidebarProvider>
      )

      expect(screen.getByTestId(SidebarTriggerID.menuIcon)).toBeInTheDocument()
    })

    it('calls toggleSidebar when clicked on mobile', async () => {
      const user = userEvent.setup()

      render(
        <SidebarProvider>
          <SidebarTrigger />
        </SidebarProvider>
      )

      await user.click(screen.getByTestId(SidebarTriggerID.trigger))

      expect(toggleSidebar).toHaveBeenCalledTimes(1)
    })
  })
})

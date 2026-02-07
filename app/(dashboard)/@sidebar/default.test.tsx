import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import SidebarDefaultPage from './default'

import { SidebarProvider } from '@components/ui/sidebar'
import { useIsMobile } from '@/lib/shadcn/hooks/use-mobile'

import { SidebarItem } from '@sidebar/_components/sidebar-item'
import { routes } from '@/lib/routes'

const MOCK_ITEM_ID = 'mock-item-id'

vi.mock('@lib/shadcn/hooks/use-mobile', () => ({
  useIsMobile: vi.fn()
}))

vi.mock('@components/ui/sidebar', async () => {
  const actual = await vi.importActual('@components/ui/sidebar')

  return ({
    ...actual,
    setIsMobile: vi.fn(),
  })
})

vi.mock('@sidebar/_components/sidebar-item', () => ({
  SidebarItem: vi.fn(() => <div data-testid={MOCK_ITEM_ID} />)
}))

describe('SidebarDefaultPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useIsMobile).mockReturnValue(false)
  })

  it('renders the sidebar', () => {
    render(
      <SidebarProvider>
        <SidebarDefaultPage />
      </SidebarProvider>
    )

    expect(screen.getByDataSlot('sidebar')).toBeInTheDocument()
    expect(screen.getByDataSlot('sidebar-menu')).toBeInTheDocument()

    expect(screen.getAllByTestId(MOCK_ITEM_ID)).toHaveLength(4)

    expect(vi.mocked(SidebarItem)).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        linkItem: expect.objectContaining({
          name: 'Business',
          href: routes.business,
        })
      }),
      undefined
    )

    expect(vi.mocked(SidebarItem)).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        linkItem: expect.objectContaining({
          name: 'Create Metric',
          href: routes.createMetric,
        })
      }),
      undefined
    )

    expect(vi.mocked(SidebarItem)).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        linkItem: expect.objectContaining({
          name: 'Score',
          href: routes.metricScore,
        })
      }),
      undefined
    )

    expect(vi.mocked(SidebarItem)).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        linkItem: expect.objectContaining({
          name: 'Explanations',
          href: routes.explanations,
        })
      }),
      undefined
    )
  })
})
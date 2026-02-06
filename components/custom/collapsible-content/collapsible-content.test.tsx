import { render, screen } from '@testing-library/react'

import { CollapsibleContent } from './collapsible-content'
import { CollapsibleID } from './test.ids'

describe('CollapsibleContent', () => {
  describe('when open is false', () => {
    it('renders collapsed content only', () => {
      render(
        <CollapsibleContent
          open={false}
          collapsedContent='Fixed Content'
          expandedContent='Expanded Content'
        />
      )

      expect(screen.getByTestId(CollapsibleID.root)).toBeInTheDocument()
      expect(screen.getByTestId(CollapsibleID.fixedContent)).toHaveTextContent('Fixed Content')
      expect(screen.queryByText(CollapsibleID.dynamicContent)).not.toBeInTheDocument()
    })
  })

  describe('when open is true', () => {
    it('renders expanded content', () => {
      render(
        <CollapsibleContent
          open={true}
          collapsedContent='Fixed Content'
          expandedContent='Expanded Content'
        />
      )

      expect(screen.getByTestId(CollapsibleID.root)).toBeInTheDocument()
      expect(screen.getByTestId(CollapsibleID.fixedContent)).toHaveTextContent('Fixed Content')
      expect(screen.getByTestId(CollapsibleID.dynamicContent)).toHaveTextContent('Expanded Content')
    })
  })

  describe('when dynamic content is children', () => {
    it('renders children', () => {

      const childrenTestID = 'children-test-id'

      render(
        <CollapsibleContent
          open={true}
          collapsedContent='Fixed Content'
        >
          <div data-testid={childrenTestID}>Expanded Content</div>
        </CollapsibleContent>
      )

      expect(screen.getByTestId(CollapsibleID.root)).toBeInTheDocument()
      expect(screen.getByTestId(CollapsibleID.fixedContent)).toHaveTextContent('Fixed Content')
      expect(screen.getByTestId(childrenTestID)).toHaveTextContent('Expanded Content')
    })
  })

  describe('when expandedContent is a component', () => {
    it('renders component', () => {

      const expandedContentTestID = 'expanded-content-test-id'

      render(
        <CollapsibleContent
          open={true}
          collapsedContent='Fixed Content'
          expandedContent={<div data-testid={expandedContentTestID}>Expanded Content</div>}
        />
      )

      expect(screen.getByTestId(CollapsibleID.root)).toBeInTheDocument()
      expect(screen.getByTestId(CollapsibleID.fixedContent)).toHaveTextContent('Fixed Content')
      expect(screen.getByTestId(expandedContentTestID)).toHaveTextContent('Expanded Content')
    })
  })
})
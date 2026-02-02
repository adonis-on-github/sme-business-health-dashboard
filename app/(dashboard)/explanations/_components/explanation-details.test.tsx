
import ExplanationsDetails from './explanations-details'
import { render, screen } from '@testing-library/react'

import { ExplanationIds } from '@dashboard/explanations/_lib/test.ids'
import type { GetInitialAnalysisResponse } from '@dashboard/explanations/_lib/actions'
import { generateAnalysis } from '@dashboard/explanations/_lib/actions'
import userEvent from '@testing-library/user-event'

vi.mock('@dashboard/explanations/_lib/actions', () => ({
  generateAnalysis: vi.fn()
}))

const mockInitialAnalysis: GetInitialAnalysisResponse = {
  type: 'GENERATED',
  data: 'mock explanation',
  timestamp: new Date('2026-01-31T14:14:44.000Z')
}

describe('ExplanationsDetails', () => {

  describe('render', () => {
    describe('when initial analysis type is "GENERATED"', () => {
      it('renders explanation correctly', () => {
        render(<ExplanationsDetails initialAnalysis={mockInitialAnalysis} />)

        expect(screen.getByTestId(ExplanationIds.content)).toHaveTextContent(mockInitialAnalysis.data)

        expect(screen.queryByTestId(ExplanationIds.explanationError)).not.toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.generatedAt)).toHaveTextContent('Generated at: Jan 31, 2026, 04:14 PM')

        expect(screen.getByTestId(ExplanationIds.generateButton)).toHaveTextContent('Regenerate')
      })
    })

    describe('when initial analysis type is "ERROR"', () => {
      it('renders explanation correctly', () => {
        const mockErrorAnalysis: GetInitialAnalysisResponse = {
          type: 'ERROR',
          data: 'mock error',
          timestamp: new Date('2026-01-31T14:14:44.000Z')
        }

        render(<ExplanationsDetails initialAnalysis={mockErrorAnalysis} />)

        expect(screen.queryByTestId(ExplanationIds.explanation)).not.toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.explanationError)).toHaveTextContent(mockErrorAnalysis.data)

        expect(screen.queryByTestId(ExplanationIds.generatedAt)).toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.generateButton)).toHaveTextContent('Try again')
      })
    })

    describe('when initial analysis type is "NO_EXPLANATION"', () => {
      it('renders explanation correctly', () => {
        const mockNoExplanationAnalysis: GetInitialAnalysisResponse = {
          type: 'NO_EXPLANATION',
        }

        render(<ExplanationsDetails initialAnalysis={mockNoExplanationAnalysis} />)

        expect(screen.getByTestId(ExplanationIds.noExplanation)).toHaveTextContent('No explanations available')

        expect(screen.queryByTestId(ExplanationIds.explanation)).not.toBeInTheDocument()

        expect(screen.queryByTestId(ExplanationIds.explanationError)).not.toBeInTheDocument()

        expect(screen.queryByTestId(ExplanationIds.generatedAt)).not.toBeInTheDocument()

        expect(screen.queryByTestId(ExplanationIds.generateButton)).toHaveTextContent('Generate')
      })
    })

  })

  describe('when button is clicked', () => {
    it('calls generateAnalysis when generate button is clicked', async () => {
      const user = userEvent.setup()

      vi.mocked(generateAnalysis).mockResolvedValue({
        type: 'GENERATED',
        data: 'mock explanation',
        timestamp: new Date('2026-01-31T14:14:44.000Z')
      })

      render(<ExplanationsDetails initialAnalysis={mockInitialAnalysis} />)

      expect(generateAnalysis).not.toHaveBeenCalled()

      await user.click(screen.getByTestId(ExplanationIds.generateButton))

      expect(generateAnalysis).toHaveBeenCalled()
    })

    describe('when the resolved value is of type "GENERATED"', () => {
      it('renders explanation correctly', async () => {
        const user = userEvent.setup()

        const mockInitialState: GetInitialAnalysisResponse = {
          type: 'NO_EXPLANATION',
        }

        const mockGeneratedAnalysis: GetInitialAnalysisResponse = {
          type: 'GENERATED',
          data: 'mock explanation',
          timestamp: new Date('2026-01-31T14:14:44.000Z')
        }

        vi.mocked(generateAnalysis).mockResolvedValue(mockGeneratedAnalysis)

        render(<ExplanationsDetails initialAnalysis={mockInitialState} />)

        await user.click(screen.getByTestId(ExplanationIds.generateButton))

        expect(screen.getByTestId(ExplanationIds.explanation)).toHaveTextContent(mockGeneratedAnalysis.data)

        expect(screen.queryByTestId(ExplanationIds.explanationError)).not.toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.generatedAt)).toHaveTextContent('Generated at: Jan 31, 2026, 04:14 PM')

        expect(screen.getByTestId(ExplanationIds.generateButton)).toHaveTextContent('Regenerate')
      })
    })

    describe('when the resolved value is of type "ERROR"', () => {
      it('renders explanation correctly', async () => {
        const user = userEvent.setup()

        const mockInitialState: GetInitialAnalysisResponse = {
          type: 'NO_EXPLANATION',
        }

        const mockErrorAnalysis: GetInitialAnalysisResponse = {
          type: 'ERROR',
          data: 'mock error',
          timestamp: new Date('2026-01-31T14:14:44.000Z')
        }

        vi.mocked(generateAnalysis).mockResolvedValue(mockErrorAnalysis)

        render(<ExplanationsDetails initialAnalysis={mockInitialState} />)

        await user.click(screen.getByTestId(ExplanationIds.generateButton))

        expect(screen.queryByTestId(ExplanationIds.explanation)).not.toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.explanationError)).toHaveTextContent(mockErrorAnalysis.data)

        expect(screen.queryByTestId(ExplanationIds.generatedAt)).toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.generateButton)).toHaveTextContent('Try again')
      })
    })

    describe('when the initial state is "ERROR"', () => {
      it('renders explanation correctly', async () => {
        const user = userEvent.setup()

        const mockInitialState: GetInitialAnalysisResponse = {
          type: 'ERROR',
          data: 'mock error',
          timestamp: new Date('2026-01-31T14:14:44.000Z')
        }

        const mockGeneratedAnalysis: GetInitialAnalysisResponse = {
          type: 'GENERATED',
          data: 'mock explanation',
          timestamp: new Date('2026-01-31T14:14:44.000Z')
        }

        vi.mocked(generateAnalysis).mockResolvedValue(mockGeneratedAnalysis)

        render(<ExplanationsDetails initialAnalysis={mockInitialState} />)

        await user.click(screen.getByTestId(ExplanationIds.generateButton))

        expect(screen.getByTestId(ExplanationIds.explanation)).toHaveTextContent(mockGeneratedAnalysis.data)

        expect(screen.queryByTestId(ExplanationIds.explanationError)).not.toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.generatedAt)).toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.generateButton)).toHaveTextContent('Regenerate')
      })
    })

    describe('when the initial state is "GENERATED"', () => {
      it('renders explanation correctly', async () => {
        const user = userEvent.setup()

        const mockInitialState: GetInitialAnalysisResponse = {
          type: 'GENERATED',
          data: 'mock explanation',
          timestamp: new Date('2026-01-31T14:14:44.000Z')
        }

        const mockGeneratedAnalysis: GetInitialAnalysisResponse = {
          type: 'GENERATED',
          data: 'mock explanation 2',
          timestamp: new Date('2026-01-31T14:15:44.000Z')
        }

        vi.mocked(generateAnalysis).mockResolvedValue(mockGeneratedAnalysis)

        render(<ExplanationsDetails initialAnalysis={mockInitialState} />)

        await user.click(screen.getByTestId(ExplanationIds.generateButton))

        expect(screen.getByTestId(ExplanationIds.explanation)).toHaveTextContent(mockGeneratedAnalysis.data)

        expect(screen.queryByTestId(ExplanationIds.explanationError)).not.toBeInTheDocument()

        expect(screen.getByTestId(ExplanationIds.generatedAt)).toHaveTextContent('Generated at: Jan 31, 2026, 04:15 PM')

        expect(screen.getByTestId(ExplanationIds.generateButton)).toHaveTextContent('Regenerate')
      })
    })
  })
})

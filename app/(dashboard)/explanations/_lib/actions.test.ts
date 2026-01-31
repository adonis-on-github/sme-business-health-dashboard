
import type { LatestMetric } from '@dashboard/_lib/service'
import { getLatestMetric } from '@dashboard/_lib/service'

import prisma from '@/lib/prisma/client'
import { runLLM } from '@/lib/openrouter/openrouter'

import { metricMock, businessMock, llmExplanationMock } from '@/lib/prisma/prisma.mocks'

import { getInitialAnalysis, generateAnalysis } from './actions'

vi.mock('@dashboard/_lib/service', () => ({
  getLatestMetric: vi.fn(),
}))

vi.mock('@/lib/openrouter/openrouter', () => ({
  runLLM: vi.fn(),
}))

vi.mock('@/lib/prisma/client', () => ({
  default: {
    lLMExplanation: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('@/lib/prompts/messages', () => ({
  buildMessages: vi.fn(),
}))

const latestMetricMock: LatestMetric = {
  ...metricMock,
  ...businessMock,
  businessName: 'Business Name',
}

describe('getInitialAnalysis', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when latest metric is available', () => {
    it('returns the latest metric', async () => {
      vi.mocked(getLatestMetric).mockResolvedValue(latestMetricMock)
      vi.mocked(prisma.lLMExplanation.findFirst).mockResolvedValue(llmExplanationMock)

      const result = await getInitialAnalysis()

      expect(result).toEqual({
        type: 'GENERATED',
        data: llmExplanationMock.explanationMarkdown,
        timestamp: llmExplanationMock.updatedAt,
      })
    })
  })

  describe('when latest metric is not available', () => {
    it('returns an error message', async () => {
      vi.mocked(getLatestMetric).mockResolvedValue(null)

      const result = await getInitialAnalysis()

      expect(result).toEqual({
        type: 'NO_METRIC',
      })
    })
  })

  describe('when latest explanation had error', () => {
    it('returns an error message', async () => {
      vi.mocked(getLatestMetric).mockResolvedValue(latestMetricMock)
      vi.mocked(prisma.lLMExplanation.findFirst).mockResolvedValue({
        ...llmExplanationMock,
        explanationMarkdown: null,
        llmStatus: 'ERROR',
        error: 'Error message',
      })

      const result = await getInitialAnalysis()

      expect(result).toEqual({
        type: 'ERROR',
        data: 'Error message',
        timestamp: llmExplanationMock.updatedAt,
      })
    })
  })

  describe('when latest error is null', () => {
    it('returns an error message', async () => {
      vi.mocked(getLatestMetric).mockResolvedValue(latestMetricMock)
      vi.mocked(prisma.lLMExplanation.findFirst).mockResolvedValue({
        ...llmExplanationMock,
        explanationMarkdown: null,
        llmStatus: 'ERROR',
        error: null,
      })

      const result = await getInitialAnalysis()

      expect(result).toEqual({
        type: 'ERROR',
        data: 'Previous explanation generation failed.',
        timestamp: llmExplanationMock.updatedAt,
      })
    })
  })

})

describe('generateAnalysis', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when latest metric is available', () => {
    it('generates the explanation and saves it to the database', async () => {

      const mockExplanation = 'mock_explanation'

      vi.mocked(getLatestMetric).mockResolvedValue(latestMetricMock)
      vi.mocked(prisma.lLMExplanation.findFirst).mockResolvedValue(null)
      vi.mocked(runLLM).mockResolvedValue(mockExplanation)
      vi.mocked(prisma.lLMExplanation.create).mockResolvedValue({
        ...llmExplanationMock,
        explanationMarkdown: mockExplanation,
      })

      const result = await generateAnalysis()

      expect(result).toEqual({
        type: 'GENERATED',
        data: mockExplanation,
        timestamp: llmExplanationMock.updatedAt,
      })

      expect(prisma.lLMExplanation.create).toHaveBeenCalledWith({
        data: {
          metricId: latestMetricMock.id,
          llmStatus: 'GENERATED',
          explanationMarkdown: mockExplanation,
        },
      })
    })

    describe('when LLM fails', () => {
      it('returns the LLM error message', async () => {
        const mockErrorMessage = 'LLM failed'

        vi.mocked(getLatestMetric).mockResolvedValue(latestMetricMock)
        vi.mocked(prisma.lLMExplanation.findFirst).mockResolvedValue(null)

        vi.mocked(runLLM).mockRejectedValue(mockErrorMessage)

        vi.mocked(prisma.lLMExplanation.create).mockResolvedValue({
          ...llmExplanationMock,
          llmStatus: 'ERROR',
          error: mockErrorMessage,
        })

        const result = await generateAnalysis()

        expect(result).toEqual({
          type: 'ERROR',
          data: mockErrorMessage,
          timestamp: llmExplanationMock.updatedAt,
        })
      })
    })

    describe('when there is an error', () => {
      it('saves the error to the database', async () => {
        const mockErrorMessage = 'LLM failed'

        vi.mocked(getLatestMetric).mockResolvedValue(latestMetricMock)
        vi.mocked(prisma.lLMExplanation.findFirst).mockResolvedValue(null)
        vi.mocked(runLLM).mockRejectedValue(mockErrorMessage)

        await generateAnalysis()

        expect(prisma.lLMExplanation.create).toHaveBeenCalledWith({
          data: {
            metricId: latestMetricMock.id,
            llmStatus: 'ERROR',
            error: mockErrorMessage,
          }
        })
      })
    })
  })

  describe('when latest metric is not available', () => {
    it('returns the LLM error message', async () => {
      vi.mocked(getLatestMetric).mockResolvedValue(null)

      const result = await generateAnalysis()

      expect(result).toEqual({
        type: 'NO_METRIC',
      })
    })
  })
})

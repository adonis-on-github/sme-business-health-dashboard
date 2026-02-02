'use server'

import { cache } from 'react'

import { getErrorMessage } from '@/lib/error-utils'
import { runLLM } from '@/lib/openrouter/openrouter'
import { buildMessages } from '@/lib/prompts/messages'
import prisma from '@/lib/prisma/client'

import { redirect } from 'next/navigation'
import { getLatestMetric } from '@dashboard/_lib/service'
import { routes } from '@/lib/routes'

export type GetInitialAnalysisResponse =
  | {
      type: 'NO_EXPLANATION'
    }
  | {
      type: 'ERROR'
      data: string
      timestamp: Date
    }
  | {
      type: 'GENERATED'
      data: string
      timestamp: Date
    }

export const getInitialAnalysis = cache(async (): Promise<GetInitialAnalysisResponse> => {
  const latestMetric = await getLatestMetric()

  if (latestMetric === null) {
    redirect(routes.createMetric)
  }

  const latestExplanation = await getLatestExplanation(latestMetric.id)

  if (latestExplanation === null) {
    return {
      type: 'NO_EXPLANATION',
    }
  }

  if (latestExplanation.llmStatus === 'ERROR') {
    return {
      type: 'ERROR',
      data: latestExplanation.error ?? 'Previous explanation generation failed.',
      timestamp: latestExplanation.createdAt,
    }
  }

  return {
    type: 'GENERATED',
    data: latestExplanation.explanationMarkdown ?? 'Empty explanation',
    timestamp: latestExplanation.createdAt,
  }
})

export const generateAnalysis = async (): Promise<GetInitialAnalysisResponse> => {
  const latestMetric = await getLatestMetric()

  if (latestMetric === null) {
    redirect(routes.createMetric)
  }

  try {
    const messages = buildMessages(latestMetric)

    const content = await runLLM(messages)

    const explanation = await addExplanation(latestMetric.id, {
      llmStatus: 'GENERATED',
      explanationMarkdown: content,
    })

    if (explanation === null) {
      throw new Error(`Failed to save explanation for metric ${latestMetric.id}`)
    }

    return {
      type: 'GENERATED',
      data: explanation.explanationMarkdown ?? 'Empty explanation',
      timestamp: explanation.createdAt,
    }
  } catch (error) {
    const message = getErrorMessage(error, 'Failed to get business analysis')

    const result = await addExplanation(latestMetric.id, {
      llmStatus: 'ERROR',
      error: message
    })

    return {
      type: 'ERROR',
      data: result?.error ?? 'Failed to generate explanations'  ,
      timestamp: result?.createdAt ?? new Date(),
    }
  }
}

const getLatestExplanation = cache(async (metricId: string) => {
  const latestExplanation = await prisma.lLMExplanation.findFirst({
    where: {
      metricId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  })

  return latestExplanation
})

type LLMExplanationArgs =
  | {
    llmStatus: 'GENERATED'
    explanationMarkdown: string
  }
  | {
    llmStatus: 'ERROR'
    error: string
  }

const addExplanation = async (metricId: string, args: LLMExplanationArgs) => {
  try {
    const explanation = await prisma.lLMExplanation.create({
      data: {
        metricId,
        ...args,
      },
    })

    return explanation

  } catch (error) {
    console.error(error)

    return null
  }
}

export type LatestExplanation = Awaited<ReturnType<typeof getLatestExplanation>>

import { OpenRouter } from '@openrouter/sdk'
import type { ChatGenerationParams } from '@openrouter/sdk/models'
import { getErrorMessage } from '../error-utils'

const MODEL_NAME = 'openai/gpt-oss-120b:free'
// 'openai/gpt-oss-120b:free'
// 'deepseek/deepseek-r1-0528:free'
// 'tngtech/deepseek-r1t-chimera:free'

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

export default openrouter

export const getAvailableCredits = async () => {
  const credits = await openrouter.credits.getCredits()

  return credits.data
}

export const runLLM = async (messages: ChatGenerationParams['messages']) => {
  try {
    const response = await openrouter.chat.send({
      model: MODEL_NAME,
      messages,
    })

    const content = response?.choices?.[0].message?.content

    if (!content || typeof content !== 'string' || content.trim() === '') {
      throw new Error('Invalid response from LLM')
    }

    return content.trim()
  } catch (error: unknown) {

    const message = getErrorMessage(error, 'Error running LLM')

    console.error(message)

    throw new Error(message)
  }
}


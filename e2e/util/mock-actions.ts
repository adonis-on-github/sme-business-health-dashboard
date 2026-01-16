import type { Page } from 'playwright/test'

import type { MockActionsIds, MockFormIds } from '@/lib/test/types'

export const setupActionMock = async <T>(page: Page, testId: MockActionsIds, data: T) => {

  await page.evaluate(({ payload, dataId }) => {
    const input = document.getElementById(dataId) as HTMLInputElement

    input.value = JSON.stringify(payload)

  }, {
    payload: data,
    dataId: testId.setup.data,
  })

  await page.click(`#${testId.setup.submit}`)

  await page.waitForLoadState('networkidle')

  await page.reload()

  return async () => resetActionMock(page, testId.reset)
}

export const resetActionMock = async (page: Page, testId: MockFormIds) => {
  await page.click(`#${testId.submit}`)

  await page.waitForLoadState('networkidle')
}

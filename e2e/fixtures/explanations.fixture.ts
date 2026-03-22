import { routes } from '@/lib/routes'
import { scoreTest } from './score.fixture'
import { ExplanationsPage } from '@e2e/pages/explanations.page'

const baseTest =  scoreTest //mergeTests(scoreTest, mswTest)

type ExplanationsFixture = {
  explanationsPage: ExplanationsPage
}

export const explanationsTest = baseTest
  .extend<ExplanationsFixture>({
  explanationsPage: async ({ page, userId }, use) => {
    await use(new ExplanationsPage(page, routes.explanations, userId))
  },
})


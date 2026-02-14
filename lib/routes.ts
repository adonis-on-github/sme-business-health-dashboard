export const routes = {
  home: '/',
  login: '/login',
  business: '/business',
  createMetric: '/create-metric',
  metricScore: '/score',
  explanations: '/explanations',
} as const

export type Route = typeof routes[keyof typeof routes]
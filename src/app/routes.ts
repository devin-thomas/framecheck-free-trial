export type AppRoute = 'catalog' | 'quiz' | 'results'

export function routeFromHash(hash = location.hash): AppRoute {
  if (hash === '#/quiz') return 'quiz'
  if (hash === '#/results') return 'results'
  return 'catalog'
}

export function hashForRoute(route: AppRoute): string {
  return route === 'catalog' ? '#/' : `#/${route}`
}

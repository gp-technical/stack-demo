var analyticsPersistenceStrategy = (payload) => {
  console.log(payload)
}

export function setupAnalyticsPersistence (strategy) {
  analyticsPersistenceStrategy = strategy
}

export function persistAnalyticsData (payload) {
  analyticsPersistenceStrategy(payload)
}

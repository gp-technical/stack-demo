const reducer = (state = {log: []}, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.analyticsClicked:
    case types.analyticsComponentVisible:
    case types.analyticsComponentHidden:
    case types.analyticsDemoDummyAction:
      var log = state.log.slice(0)
      log.push({type, data})
      if (log.length > 40) {
        log.shift()
      }
      return {...state, log}
    default:
      return state
  }
}

export default reducer

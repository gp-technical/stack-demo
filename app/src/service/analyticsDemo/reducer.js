const reducer = (state = {log: []}, action) => {
  const { type, data } = action
  if (!type.endsWith('_RESPONSE')) {
    var log = state.log.slice(0)
    log.push({type, data})
    if (log.length > 40) {
      log.shift()
    }
    return {...state, log}
  } else {
    return state
  }
}

export default reducer

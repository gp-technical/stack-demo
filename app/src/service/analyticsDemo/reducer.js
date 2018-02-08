const reducer = (state = {log: []}, action) => {
  const { type, types, data } = action
  if (!type.endsWith("_RESPONSE")) {
    var log = state.log.slice(0)
    log.push(JSON.stringify({type, data}))
    if (log.length > 40) {
      log.shift()
    }
    return {...state, log}
  } else {
    return state
  }
}

export default reducer

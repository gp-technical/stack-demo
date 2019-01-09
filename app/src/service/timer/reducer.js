const reducer = (state = {}, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.timer_init:
    case types.timerGetTimeResponse:
      return { ...state, time: data.time }
    default:
      return state
  }
}

export default reducer

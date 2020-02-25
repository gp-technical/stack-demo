const reducer = (state = {}, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.fibo_init:
    case types.fiboNextResponse:
    case types.fiboBigNumberResponse:
      return { ...state, sequence: data.sequence }
    default:
      return state
  }
}

export default reducer

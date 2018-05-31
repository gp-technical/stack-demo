const reducer = (state = {}, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.mailChange:
      return { ...state, email: data }
    case types.mailValidate:
      return { ...state, isValid: data }
    case types.mailClient:
      return { ...state, loading: true }
    case types.mailClientResponse:
      return { ...state, status: data, loading: false }
    default:
      return state
  }
}

export default reducer

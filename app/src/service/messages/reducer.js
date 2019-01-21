const reducer = (state = { message: {} }, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.messagesProgressResponse:
      return { ...state, result: data }
    case types.apiInfo:
    case types.apiProgress:
    case types.apiError:
    case types.apiCustom:
      return { ...state, message: data, result: null }
    default:
      return state
  }
}

export default reducer

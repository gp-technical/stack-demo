const reducer = (state = { result: {}, message: {} }, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.messages_init:
      return { ...state, result: data.result }
    case types.messagesInfoResponse:
      return { ...state, result: data.result }
    case types.messagesProgressResponse:
      return { ...state, result: data.result }
    case types.messagesErrorResponse:
      return { ...state, result: data.result }
    case types.messagesCustomResponse:
      return { ...state, result: data.result }
    case types.apiInfo:
      return { ...state, message: data.message }
    case types.apiProgress:
      return { ...state, message: data.message, result: data.result }
    case types.apiError:
      return { ...state, message: data.message }
    case types.apiCustom:
      return { ...state, message: data.message }
    default:
      return state
  }
}

export default reducer

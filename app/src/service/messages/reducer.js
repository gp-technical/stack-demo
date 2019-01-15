const reducer = (state = { apiText: '', messageText: '' }, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.messages_init:
      return { ...state, apiText: data }
    case types.messagesInfoResponse:
      return { ...state, apiText: data }
    case types.messagesProgressResponse:
      return { ...state, apiText: data }
    case types.messagesErrorResponse:
      return { ...state, apiText: data }
    case types.messagesCustomResponse:
      return { ...state, apiText: data }
    case types.apiInfo:
      return { ...state, messageText: data }
    case types.apiProgress:
      return { ...state, messageText: data }
    case types.apiError:
      return { ...state, messageText: data }
    case types.apiCustom:
      return { ...state, messageText: data }
    default:
      return state
  }
}

export default reducer

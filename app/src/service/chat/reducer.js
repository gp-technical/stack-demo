const initialState = {}

const reducer = (state = initialState, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.chat_init:
      return { ...state, messages: data.messages }
    case types.chatBroadcast:
      return { ...state, messages: [data, ...state.messages] }
    default:
      return state
  }
}

export default reducer

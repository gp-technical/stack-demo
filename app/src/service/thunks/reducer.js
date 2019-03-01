const reducer = (state = { answer: 'unknown' }, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.thunksStart:
      return { ...state, isRunning: true }
    case types.thunksGetAnswerResponse:
      return { ...state, answer: data.answer }
    case types.thunksFinish:
      return { ...state, isRunning: false }
    default:
      return state
  }
}

export default reducer

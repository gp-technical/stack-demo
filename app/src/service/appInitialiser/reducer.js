const initialState = {}

const reducer = (state = initialState, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.appInitialiser_init:
      return { ...state, backgroundColor: data }
    default:
      return state
  }
}

export default reducer

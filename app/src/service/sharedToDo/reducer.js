const initialState = {
  todos: [],
  localToDo: {
    ownerId: '',
    text: '',
    shared: []
  }
}

const reducer = (state = initialState, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.sharedToDo_init:
      console.log('Init! socket id:', data.socketId)
      return { ...state, localToDo: { ...state.localToDo, ownerId: data.socketId } }

    default:
      return state
  }
}

export default reducer

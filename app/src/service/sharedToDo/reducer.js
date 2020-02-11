const initialState = {
  todos: [],
  ownerId: '',
  localToDo: {
    text: '',
    shared: []
  }
}

const reducer = (state = initialState, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.sharedToDo_init:
      console.log('Init! socket id:', data.socketId)
      return { ...state, ownerId: data.socketId }

    case types.sharedToDoAddTodoResponse:
      console.log(data)
      return { ...state, todos: data.todos }

    default:
      return state
  }
}

export default reducer

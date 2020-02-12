const initialState = {
  todos: [],
  ownerId: '',
  localToDo: {
    text: '',
    shared: []
  },
  loggedUsers: []
}

const reducer = (state = initialState, action) => {
  const { type, types, data } = action
  console.log(action)
  switch (type) {
    case types.sharedToDo_init:
      return { ...state, ownerId: data.socketId }

    case types.sharedToDoSetLocalToDo:
      return { ...state, localToDo: data }

    case types.sharedToDoAddToDoResponse: {
      console.log(data.todos)
      return { ...state, todos: data.todos }
    }

    case types.sharedToDoEditToDoResponse:
      return { ...state, todos: data.todos }

    case types.sharedToDoLoggedUsers:
      return { ...state, loggedUsers: data.loggedUsers }

    default:
      return state
  }
}

export default reducer

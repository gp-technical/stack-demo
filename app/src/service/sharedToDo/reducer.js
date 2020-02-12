const initialState = {
  todos: [],
  ownerId: '',
  localToDo: {
    text: '',
    shared: []
  },
  editedToDoDialogOpen: false,
  editedToDo: {
    id: '',
    text: '',
    shared: [],
    ownerId: '',
    done: false
  },
  loggedUsers: []
}

const reducer = (state = initialState, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.sharedToDo_init:
      return { ...state, ownerId: data.socketId }

    case types.sharedToDoSetLocalToDo:
      return { ...state, localToDo: data }

    case types.sharedToDoSetEditedToDo:
      return { ...state, editedToDo: data }

    case types.sharedToDoToggleEditDialog:
      return { ...state, editedToDoDialogOpen: !state.editedToDoDialogOpen }

    case types.sharedToDoAddToDoResponse: {
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

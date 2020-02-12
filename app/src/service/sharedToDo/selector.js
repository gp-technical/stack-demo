import name from './name'

const get = state => state[name]

const getLocalToDo = state => get(state).localToDo
const getEditedToDo = state => get(state).editedToDo
const getEditedToDoDialogOpen = state => get(state).editedToDoDialogOpen

const getTodos = state => get(state).todos

const getTodosFromUser = state => {
  const { todos, ownerId } = get(state)
  const newTodos = todos.filter(
    todo => todo.ownerId === ownerId || (todo.shared.includes(ownerId) && todo)
  )
  return newTodos
}

const getOwnerId = state => get(state).ownerId

const getLoggedUsers = state => get(state).loggedUsers

export default {
  getLocalToDo,
  getEditedToDo,
  getEditedToDoDialogOpen,
  getTodos,
  getTodosFromUser,
  getOwnerId,
  getLoggedUsers
}

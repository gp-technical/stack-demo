import name from './name'

const get = state => state[name]

const getLocalToDo = state => get(state).localToDo
const getEditedToDo = state => get(state).editedToDo
const getEditedToDoDialogOpen = state => get(state).editedToDoDialogOpen
const getOnlyMyToDo = state => get(state).onlyMyToDo
const getToDos = state => get(state).todos

const getToDosFromUser = state => {
  const { todos, ownerId } = get(state)
  const newToDos = todos.filter(
    todo => todo.ownerId === ownerId || (todo.shared.includes(ownerId) && todo)
  )
  return newToDos
}

const getOwnerId = state => get(state).ownerId

const getLoggedUsers = state => get(state).loggedUsers

export default {
  getLocalToDo,
  getEditedToDo,
  getEditedToDoDialogOpen,
  getOnlyMyToDo,
  getToDos,
  getToDosFromUser,
  getOwnerId,
  getLoggedUsers
}

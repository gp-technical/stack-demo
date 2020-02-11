import name from './name'

const get = state => {
  return state[name]
}

const getTodos = state => {
  return get(state).todos
}

const getTodosFromUser = state => {
  const { todos, ownerId } = get(state)
  const newTodos = todos.filter(
    todo => todo.ownerId === ownerId || (todo.shared.includes(ownerId) && todo)
  )
  return newTodos
}

const getOwnerId = state => get(state).ownerId

export default {
  getTodos,
  getTodosFromUser,
  getOwnerId
}

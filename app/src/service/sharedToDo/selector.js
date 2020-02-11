import name from './name'

const get = state => {
  return state[name]
}

const getTodos = state => {
  return get(state).todos
}

export default {
  getTodos
}

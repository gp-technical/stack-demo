import name from './name'

const get = state => {
  return state[name]
}

const getMessages = state => {
  return get(state).messages
}

const getId = state => {
  return get(state).id
}

export default { getId, getMessages }
